import { EventData, Observable } from "tns-core-modules/data/observable";
import { topmost } from "tns-core-modules/ui/frame";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Page } from "tns-core-modules/ui/page";
import { ListViewLinksdModel } from "../links-view-model";
import { Link } from "../link";

let vm: Observable;

// Add internal links here
const navigationLinks: Array<Link> = [
    new Link("Sub Folder", "/sub-folder"),
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

        topmost().navigate({
            moduleName: navigationModule,
            context: { "actionBarTitle": linkItem.title }
        });
    });
}
