// >> application-import-ts
import * as application from "tns-core-modules/application";
// << application-import-ts
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Color } from "tns-core-modules/color";
import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Page } from "tns-core-modules/ui/page";

export function onGridLoaded(args: EventData) {
    const grid = <GridLayout>args.object;
    const lbl = <Label>grid.getViewById("lbl");
    const iconLabel = <Label>grid.getViewById("iconLabel");

    iconLabel.className = "fa";
    iconLabel.textAlignment = "center";
    iconLabel.verticalAlignment = "middle";
    iconLabel.fontSize = 40;

    lbl.textAlignment = "center";
    lbl.verticalAlignment = "middle";
    lbl.fontSize = 24;

    // >> application-platform-ts
    if (application.android) {
        console.log("We are running on Android device!");

        // >> (hide)
        iconLabel.text = String.fromCharCode(0xff17b);
        lbl.text = "Android Applicaiton";
        // << (hide)
    } else if (application.ios) {
        console.log("We are running on iOS device");

        // >> (hide)
        iconLabel.text = String.fromCharCode(0xf179);
        lbl.text = "iOS Applicaiton";
        // << (hide)
    }
    // << application-platform-ts
}

export function onNavigatingTo(args) {
    const page = <Page>args.object;
    page.actionBar.title = args.context.title;
}
