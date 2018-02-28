// >> application-import-ts
import * as application from "tns-core-modules/application";
// << application-import-ts
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

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
