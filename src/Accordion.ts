import { AbstractWraplet, WrapletChildrenMap } from "wraplet";
import { AccordionItem } from "./index";
import { itemAttribute } from "./selectors";

const map = {
  children: {
    selector: `:scope > [${itemAttribute}]`,
    Class: AccordionItem,
    required: true,
    multiple: true,
  },
} as const satisfies WrapletChildrenMap;

export default class Accordion extends AbstractWraplet<typeof map> {
  protected defineChildrenMap(): typeof map {
    return map;
  }
}
