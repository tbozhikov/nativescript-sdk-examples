import { Observable } from "tns-core-modules/data/observable";
import { topmost } from "tns-core-modules/ui/frame";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Link } from "./link";

export class ListViewLinksdModel extends Observable {

    private _links: Array<Link>;

    constructor() {
        super();
    }

    get links(): Array<Link> {
        return this._links;
    }

    set links(value: Array<Link>) {

        value.sort((a, b) => {
            let titleA = a.title.toUpperCase();
            let titleB = b.title.toUpperCase();
            return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
        });

        if (this._links !== value) {
            this._links = value;
            this.notifyPropertyChange("links", value);
        }
    }

    onItemTap(args: ItemEventData) {
        const linkItem = this.links[args.index];

        // e.g. "/application/application-page"
        const navigationModule = linkItem.link.toLowerCase() + (linkItem.link.toLowerCase() + "-page");

        topmost().navigate({
            moduleName: navigationModule,
            context: { "actionBarTitle": linkItem.title, "rootFolder": linkItem.link }
        });
    }
}
