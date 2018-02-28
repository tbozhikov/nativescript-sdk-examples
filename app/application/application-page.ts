import { EventData, Observable } from "tns-core-modules/data/observable";
import { topmost } from "tns-core-modules/ui/frame";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Page } from "tns-core-modules/ui/page";
import { ListViewLinksdModel } from "../links-view-model";
import { Link } from "../link";

let vm: Observable;
const navigationLinks: Array<Link> = [
    new Link("Check Platform", "/check-platform"),
    new Link("Application Events", "/application-events"),
    new Link("Android Broadcast Receiver", "/android-broadcast-receiver")
];

export function onNavigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.actionBar.title = "";

    vm = new ListViewLinksdModel();
    vm.set("links", navigationLinks);

    page.bindingContext = vm;
}

export function onNavigatedTo(args) {
    vm.set("rootFolder", args.context.rootFolder);
    vm.set("actionBarTitle", args.context.actionBarTitle); // consider using Hardcoded action-bar titles instead
    vm.set("onItemTap", (params) => {
        const linkItem = navigationLinks[params.index];

        // tslint:disable:max-line-length
        const navigationModule = vm.get("rootFolder") + linkItem.link.toLowerCase() + (linkItem.link.toLowerCase() + "-page"); // e.g. "/application/check-platform/check-platform-page"

        console.log("[navigationModule]: " + navigationModule);

        topmost().navigate({
            moduleName: navigationModule,
            context: { "actionBarTitle": linkItem.title }
        });
    });
}
