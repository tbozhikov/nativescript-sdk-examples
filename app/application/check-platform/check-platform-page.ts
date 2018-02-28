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

    // >> application-platform-ts
    if (application.android) {
        console.log("We are running on Android device!");

        // >> (hide)
        grid.backgroundColor = "orange";
        grid.borderRadius = 20;
        grid.margin = 20;
        lbl.color = new Color("white");
        lbl.fontSize = 26;
        lbl.text = "Android Applicaiton";
        lbl.textAlignment = "center";
        lbl.verticalAlignment = "middle";
        // << (hide)
    } else if (application.ios) {
        console.log("We are running on iOS device");

        // >> (hide)
        grid.backgroundColor = "blue";
        grid.borderRadius = 20;
        grid.margin = 20;
        lbl.color = new Color("white");
        lbl.fontSize = 26;
        lbl.text = "iOS Applicaiton";
        lbl.textAlignment = "center";
        // << (hide)
    }
    // << application-platform-ts
}

export function onNavigatingTo(args) {
    let page = <Page>args.object;
    page.actionBar.title = "";
}

export function onNavigatedTo(args) {
    let page = <Page>args.object;

    let vm = new Observable();
    vm.set("actionBarTitle", args.context.actionBarTitle);

    page.bindingContext = vm;
}
