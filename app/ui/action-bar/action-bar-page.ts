import { EventData, Observable } from "tns-core-modules/data/observable";
import { topmost } from "tns-core-modules/ui/frame";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Page } from "tns-core-modules/ui/page";
import { ListViewLinksModel } from "../../links-view-model";
import { Link } from "../../link";

const navigationLinks: Array<Link> = [
    new Link("Getting Started", "/ui/action-bar/getting-started/getting-started-page"),
];

export function onNavigatingTo(args) {
    let page = <Page>args.object;
    console.log("onNavigatingTo: title: " + args.context.title);
    page.bindingContext = new ListViewLinksModel(navigationLinks);
    page.bindingContext.actionBarTitle = args.context.title;
}
