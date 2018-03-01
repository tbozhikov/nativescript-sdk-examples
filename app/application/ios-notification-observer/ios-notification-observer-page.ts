import * as application from "tns-core-modules/application";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { isIOS } from "tns-core-modules/platform";
import { ios as iosUtils } from "tns-core-modules/utils/utils";

let vm, observer;

export function onNavigatingTo(args) {
    let page = <Page>args.object;

    vm = new Observable();
    vm.set("info", "Using iOS Notification Observer \nto check the battery life");
    vm.set("batteryLife", "0");
    vm.set("isIOS", isIOS);

    page.bindingContext = vm;
    page.actionBar.title = args.context.title;
}

export function onNavigatedTo(args) {
    vm.set("actionBarTitle", args.context.actionBarTitle);

    // >> app-ios-observer-code
    if (application.ios) {
        // import { ios as iosUtils } from "tns-core-modules/utils/utils";
        iosUtils.getter(UIDevice, UIDevice.currentDevice).batteryMonitoringEnabled = true;
        vm.set("batteryLife", +(iosUtils.getter(UIDevice, UIDevice.currentDevice).batteryLevel * 100).toFixed(1));

        observer = application.ios.addNotificationObserver(UIDeviceBatteryLevelDidChangeNotification,
            function onReceiveCallback(notification: NSNotification) {
                // tslint:disable:max-line-length
                vm.set("batteryLife", +(iosUtils.getter(UIDevice, UIDevice.currentDevice).batteryLevel * 100).toFixed(1));
            });
    }
    // << app-ios-observer-code
}

export function onUnloaded() {
    if (application.ios) {
        // >> app-ios-observer-remove
        application.ios.removeNotificationObserver(observer, UIDeviceBatteryLevelDidChangeNotification);
        // << app-ios-observer-remove
    }
}
