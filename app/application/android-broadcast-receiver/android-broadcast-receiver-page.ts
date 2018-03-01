import * as application from "tns-core-modules/application";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid } from "tns-core-modules/platform";

let vm, receiver;

export function onNavigatingTo(args) {
    const page = <Page>args.object;
    page.actionBar.title = "";

    vm = new Observable();
    vm.set("info", "Using Android Broadcast Receiver \nto check the battery life");
    vm.set("batteryLife", "0");
    vm.set("isAndroid", isAndroid);

    page.bindingContext = vm;
    page.actionBar.title = args.context.title;
}

export function onNavigatedTo(args) {
    vm.set("actionBarTitle", args.context.actionBarTitle);

    // >> broadcast-receiver
    if (application.android) {
        // use tns-platform-dclarations to acces native APIs (e.g. ndroid.content.Intent)
        receiver = application.android.registerBroadcastReceiver(android.content.Intent.ACTION_BATTERY_CHANGED,
            function onReceiveCallback(context: android.content.Context, intent: android.content.Intent) {
                let level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
                let scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
                let percent = (level / scale) * 100.0;

                vm.set("batteryLife", percent.toString());
            });
    }
    // << broadcast-receiver
}

export function onUnloaded() {
    if (application.android) {
        // >> broadcast-receiver-remove
        application.android.unregisterBroadcastReceiver(receiver);
        // << broadcast-receiver-remove
    }
}

