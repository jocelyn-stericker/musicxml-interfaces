/** 
 * Copyright (C) 2015 Josh Netterfield
 * Part of the ripieno-musicxml project, a MusicXML to SVG converter.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* tslint:disable */

import Bootstrap    = require("react-bootstrap");
import React        = require("react");
import TypedReact   = require("typed-react");
import _            = require("lodash");
import assert       = require("assert");

class Header extends TypedReact.Component<Header.IProps, IState> {
    render(): any {
        var brand = <!span style={{fontFamily: "Alegreya SC", fontSize: "14px", fontWeight: 900}}>
            MusicXML Interfaces
            <!span className="ripieno-backlink-alt" role="button"
                        style={{fontFamily: "Alegreya SC", fontWeight: 400, marginLeft: 5}}
                    eventKey={1}>
                <!a href="https://ripieno.io">
                    from Ripieno.io »
                </a>
            </span>
        </span>;
        return <!Bootstrap.Navbar componentClass="header" brand={brand} toggleNavKey={0} role="banner" staticTop={true}>
            <!Bootstrap.Nav className="partialnav"
                    role="nav" style={{fontFamily: "Alegreya SC, Alegreya"}}
                    eventKey={0}>
                <!Bootstrap.NavItem href="#home" active={true}>
                    Home
                </Bootstrap.NavItem>
                <!Bootstrap.NavItem href="#start">
                    Getting Started
                </Bootstrap.NavItem>
                <!Bootstrap.NavItem href="#spec">
                    Specification
                </Bootstrap.NavItem>
            </Bootstrap.Nav>
            <!ul className="ripieno-backlink navbar-right" role="button"
                        style={{fontFamily: "Alegreya SC, Alegreya", marginTop: 15.5, float: "left"}}
                    eventKey={1}>
                <!a href="https://ripieno.io">
                    A Ripieno.io Project »
                </a>
            </ul>
        </Bootstrap.Navbar>;
    }
}

interface IState {
}

module Header {
    export var Component = TypedReact.createClass(Header);
    export interface IProps {
        selectedKey: string;
        onSelect: (field: string) => void;
    }
}

export = Header;
