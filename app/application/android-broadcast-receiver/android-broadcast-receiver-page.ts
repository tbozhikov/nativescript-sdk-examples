import * as application from "tns-core-modules/application";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid } from "tns-core-modules/platform";

let vm;

export function onNavigatingTo(args) {
    const page = <Page>args.object;
    page.actionBar.title = "";

    vm = new Observable();
    vm.set("batteryLife", "0");
    vm.set("isAndroid", isAndroid);

    page.bindingContext = vm;
}

export function onNavigatedTo(args) {
    vm.set("actionBarTitle", args.context.actionBarTitle);

    // >> broadcast-receiver
    if (application.android) {
        // use tns-platform-dclarations to acces native APIs (e.g. ndroid.content.Intent)
        application.android.registerBroadcastReceiver(android.content.Intent.ACTION_BATTERY_CHANGED,
            function onReceiveCallback(context: android.content.Context, intent: android.content.Intent) {
                let level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
                let scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
                let percent = (level / scale) * 100.0;

                vm.set("batteryLife", percent.toString());
            });
    }
    // << broadcast-receiver
}
