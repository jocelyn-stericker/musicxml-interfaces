 // Type definitions for react-bootstrap
 // Project: https://react-bootstrap.github.io/
 // Definitions by: René Verheij <https://github.com/flyon>
 // Definitions: https://github.com/borisyankov/DefinitelyTyped
 /// <reference path="./react.d.ts" />

declare module 'react-bootstrap' {
    export var Accordion:React.ReactComponentFactory<PanelGroupAttributes>;
    export var Affix:React.ReactComponentFactory<AffixAttributes>;
    export var AffixMixin:React.Mixin<AffixAttributes,any>;
    export var Alert:React.ReactComponentFactory<AlertAttributes>;
    export var Badge:React.ReactComponentFactory<BadgeAttributes>;
    export var Button:React.ReactComponentFactory<ButtonAttributes>;
    export var ButtonGroup:React.ReactComponentFactory<ButtonGroupAttributes>;
    export var ButtonToolbar:React.ReactComponentFactory<ReactBootstrapAttributes>;
    export var Carousel:React.ReactComponentFactory<CarouselAttributes>;
    export var CarouselItem:React.ReactComponentFactory<CarouselItemAttributes>;
    export var Col:React.ReactComponentFactory<ColAttributes>;
    export var DropdownButton:React.ReactComponentFactory<DropdownButtonAttributes>;
    export var DropdownMenu:React.ReactComponentFactory<DropdownMenuAttributes>;
    export var Glyphicon:React.ReactComponentFactory<GlyphiconAttributes>;
    export var Grid:React.ReactComponentFactory<GridAttributes>;
    export var Input:React.ReactComponentFactory<InputAttributes>;
    export var Interpolate:React.ReactComponentFactory<InterpolateAttributes>;
    export var Jumbotron:React.ReactComponentFactory<{}>;
    export var Label:React.ReactComponentFactory<ReactBootstrapAttributes>;
    export var ListGroup:React.ReactComponentFactory<ListGroupAttributes>;
    export var ListGroupItem:React.ReactComponentFactory<ListGroupItemAttributes>;
    export var MenuItem:React.ReactComponentFactory<MenuItemAttributes>;
    export var Modal:React.ReactComponentFactory<ModalAttributes>;
    export var ModalTrigger:React.ReactComponentFactory<ModalTriggerAttributes>;
    export var Nav:React.ReactComponentFactory<NavAttributes>;
    export var NavItem:React.ReactComponentFactory<NavItemAttributes>;
    export var Navbar:React.ReactComponentFactory<NavbarAttributes>;
    export var OverlayTrigger:React.ReactComponentFactory<OverlayTriggerAttributes>;
    export var PageHeader:React.ReactComponentFactory<any>;
    export var PageItem:React.ReactComponentFactory<PageItemAttributes>;
    export var Pager:React.ReactComponentFactory<PagerAttributes>;
    export var Panel:React.ReactComponentFactory<PanelAttributes>;
    export var PanelGroup:React.ReactComponentFactory<PanelGroupAttributes>;
    export var Popover:React.ReactComponentFactory<PopoverAttributes>;
    export var ProgressBar:React.ReactComponentFactory<ProgressBarAttributes>;
    export var Row:React.ReactComponentFactory<RowAttributes>;
    export var SplitButton:React.ReactComponentFactory<SplitButtonAttributes>;
    export var SubNav:React.ReactComponentFactory<SubNavAttributes>;
    export var TabPane:React.ReactComponentFactory<TabPaneAttributes>;
    export var TabbedArea:React.ReactComponentFactory<TabbedAreaAttributes>;
    export var Table:React.ReactComponentFactory<TableAttributes>;
    export var Tooltip:React.ReactComponentFactory<TooltipAttributes>;
    export var Well:React.ReactComponentFactory<ReactBootstrapAttributes>;
    
    export var OverlayMixin: any;

    export interface TooltipAttributes extends ReactBootstrapAttributes
    {
            /**
            * oneOf(['top','right', 'bottom', 'left']),
            */
            placement?: string;
            positionLeft?:number;
            positionTop?:number;
            arrowOffsetLeft?:number;
            arrowOffsetTop?:number;
    }
    export interface TableAttributes extends React.DomAttributes
    {
            striped?: boolean;
            bordered?: boolean;
            condensed?: boolean;
            hover?: boolean;
            responsive?: boolean;
    }
    export interface TabbedAreaAttributes extends ReactBootstrapAttributes
    {
            /**
            * oneOf(['tabs','pills'])
            */
            bsStyle: string;
            animation: boolean;
            onSelect:(key?:string)=>void;
    }
    export interface TabPaneAttributes extends React.DomAttributes
    {
            animation?:boolean;
            active?:boolean;
            onAnimateOutEnd?:()=>void;
    }
    export interface SubNavAttributes extends ReactBootstrapAttributes
    {
            onSelect?: (key?:string, href?:string)=>void;
            active?: boolean;
            disabled?: boolean;
            href?: string;
            title?: string;
            text?: any;
    }

    export interface SplitButtonAttributes extends ReactBootstrapAttributes
    {
            pullRight?: boolean;
            title?: any;
            href?: string;
            /**
            * Is rendered inside <span>
            */
            dropdownTitle?: any
            onClick?: (e?:React.MouseEvent)=>void;
            onSelect?: (key?:string)=>void;
            disabled?: boolean;
    }
    export interface RowAttributes extends React.DomAttributes
    {
            componentClass: string;
    }

    export interface ProgressBarAttributes extends ReactBootstrapAttributes
    {
            min?: number;
            now?: number;
            max?: number;
            label?: any;
            /**
            * ScreenReaderOnly
            */
            srOnly?: boolean;
            striped?: boolean;
            active?: boolean;
    }
    export interface PopoverAttributes extends ReactBootstrapAttributes
    {
            /**
            * oneOf(['top','right', 'bottom', 'left']),
            */
            placement?: string;
            positionLeft?: number;
            positionTop?: number;
            arrowOffsetLeft?: number;
            arrowOffsetTop?: number;
            title?: any;
    }
    export interface PanelGroupAttributes extends ReactBootstrapAttributes {
            collapsable?: boolean;
            activeKey?: any;
            defaultActiveKey?: any;
            onSelect?: (key?:string)=>void;
    }
    export interface PanelAttributes extends ReactBootstrapAttributes,CollapsableAttributes {
            onSelect?: (key?:string)=>void;
            header?: any;
            footer?: any;
    }

    export interface PagerAttributes extends React.DomAttributes
    {
            onSelect:()=>void;
    }
    export interface PageItemAttributes extends React.DomAttributes
    {
            disabled?: boolean;
            previous?: boolean;
            next?: boolean;
            onSelect?:(key?:string,href?:string)=>void;
    }
    export interface OverlayTriggerAttributes extends OverlayAttributes
    {
            /**
            * oneOfType([
                    oneOf(['manual', 'click', 'hover', 'focus']),
                    arrayOf(oneOf(['click', 'hover', 'focus']))
            ])
            */
            trigger?: any;
            /**
            * oneOf(['top','right', 'bottom', 'left']),
            */
            placement?: string;
            delay?: number;
            delayShow?: number;
            delayHide?: number;
            defaultOverlayShown?:boolean;
            overlay: any;
    }
    export interface NavbarAttributes extends ReactBootstrapAttributes
    {
            fixedTop?:boolean;
            fixedBottom?:boolean;
            staticTop?:boolean;
            inverse?:boolean;
            fluid?:boolean;
            role?: string;
            componentClass: string;
            brand?: any;
            toggleButton?: any;
            onToggle?: ()=>void;
            navExpanded?:boolean;
            defaultNavExpanded?: boolean;
    }
    export interface NavItemAttributes extends ReactBootstrapAttributes
    {
            onSelect?:(key?:string,href?:string)=>void;
            active?:boolean;
            disabled?:boolean;
            href?:string;
            title?:string;
    }
    export interface NavAttributes extends ReactBootstrapAttributes,CollapsableAttributes
    {
            /**
            * oneOf('tabs','pills')
            */
            bsStyle?: string;
            stacked?:boolean;
            justified?:boolean;
            //TODO: see what type of attributes
            onSelect?: (s: string)=>void;
            collapsable?:boolean;
            expanded?:boolean;
            navbar?: boolean;
    }
    export interface OverlayAttributes extends React.DomAttributes
    {
            /**
            * CustomPropTypes.mountable
            */
            container?: any;
    }
    export interface ModalTriggerAttributes extends OverlayAttributes
    {
            //change to 'any'?
            modal: React.ReactComponentElement<ModalAttributes>
    }

    export interface ModalAttributes extends ReactBootstrapAttributes
    {
            title: any;
            /**
            * oneOf(['static', true, false]),
            */
            backdrop?: string;
            keyboard?: boolean;
            closeButton?:boolean;
            animation?:boolean;
            onRequestHide:()=>void;
    }
    export interface ListGroupItemAttributes extends ReactBootstrapAttributes
    {
            /**
            * oneOf(['danger','info','success','warning']),
            */
            bsStyle?: string;
            active?: any;
            disabled?: any;
            header?: any;
            /**
            * NOTE: In actuality: onClick?: (key?:string,href?:string)=>void;
            * Altough typescript does not allow overwrites
            * React Bootstrap implements onClick different from the React default
            * with two parameters, being: key and href
            * @param key:string
            * @param href:string
            */
            onClick?: (event: React.MouseEvent) => void;

    }
    export interface ListGroupAttributes extends ReactBootstrapAttributes
    {
            onClick:()=>void;
    }
    export interface InterpolateAttributes extends React.DomAttributes
    {
            format?: string;
    }

    export interface InputAttributes extends React.DomAttributes
    {
            type?: string;
            label?: any;
            help?: any;
            addonBefore?: any;
            addonAfter?: any;
            /**
            * success,warning,error,default,info
            */
            bsStyle?: string;
            hasFeedback?: boolean;
            groupClassName?: string;
            wrapperClassName?: string;
            labelClassName?: string;
            disabled?: boolean;
    }
    export interface GridAttributes extends React.DomAttributes
    {
            fluid?:boolean;
            compenentClass:string;
    }
    export interface GlyphiconAttributes extends ReactBootstrapAttributes
    {
            glyph: string;
    }
    export interface DropdownMenuAttributes extends React.DomAttributes
    {
            pullRight?: boolean;
            //TODO: what type of attributes?
            onSelect?: ()=>void;
    }
    export interface DropdownButtonAttributes extends ReactBootstrapAttributes
    {
            pullRight?:boolean;
            dropup?:boolean;
            title?:any;
            href?:string;
            onClick?:()=>void;
            onSelect?:(key?:string)=>void;
            navItem?:boolean;
    }
    export interface CollapsableAttributes
    {
            collapsable?: boolean;
            defaultExpanded?: boolean;
            expanded?: boolean;
    }

    export interface ColAttributes extends React.DomAttributes
    {
            xs?: number;
            sm?: number;
            md?: number;
            lg?: number;
            xsOffset?: number;
            smOffset?: number;
            mdOffset?: number;
            lgOffset?: number;
            xsPush?: number;
            smPush?: number;
            mdPush?: number;
            lgPush?: number;
            xsPull?: number;
            smPull?: number;
            mdPull?: number;
            lgPull?: number;
            componentClass: string;
    }

    export interface CarouselItemAttributes extends React.DomAttributes
    {
            /**
            * oneOf(['prev', 'next']),
            */
            direction?: string;
            onAnimateOutEnd?: (index:string)=>void;
            active?: boolean;
            caption?: any;
    }
    export interface CarouselAttributes extends ReactBootstrapAttributes
    {
            slide?:boolean;
            indicators?:boolean;
            controls?:boolean;
            pauseOnHover?:boolean;
            wrap?:boolean;
            onSelect?:(index?:string,direction?:string)=>void;
            onSlideEnd?: ()=>void;
            activeIndex?: number;
            defaultActiveIndex?: number;
            /**
            * 'prev' or 'next'
            */
            direction?:string;
    }
    export interface ButtonGroupAttributes extends ReactBootstrapAttributes
    {
            vertical?:boolean;
            justified?:boolean;
    }
    export interface ButtonAttributes extends ReactBootstrapAttributes
    {
            active?:boolean;
            disabled?: boolean;
            block?: boolean;
            navItem?:boolean;
            navDropdown?:boolean;
            componentClass?:string;
    }
    export interface BadgeAttributes extends React.DomAttributes
    {
            pullRight?: boolean;
    }
    export interface AlertAttributes extends ReactBootstrapAttributes
    {
            onDismiss?: (e?:React.MouseEvent)=>void;
            dismissAfter?: number;
    }
    export interface ReactBootstrapAttributes extends React.DomAttributes
    {
            /**
            * Used internally in react-bootstrap
            */
            bsClass?:string;
            /**
            * 'default','primary','success','info','warning','danger',
            *	'link','inline',
            *	'tabs','pills'
            **/
            bsStyle?:string;
            /**
            * 'large','medium','small','xsmall'
            */
            bsSize?:string;
    }
    export interface AffixAttributes extends React.DomAttributes
    {
            offset?: number;
            offsetTop?: number;
            offsetBottom?: number;
    }

    export interface MenuItemAttributes extends ReactBootstrapAttributes
    {
            header?:boolean;
            divider?:boolean;
            href?:string;
            title?:string;
            onSelect?:(key?:string)=>void;
    }
}

