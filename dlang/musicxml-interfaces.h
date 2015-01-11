/**
 * @file Handles the loading and representation of MusicXML scores
 * 
 * @copyright (c) Josh Netterfield <joshua@nettek.ca> October 2014
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

#ifndef MUSICXML_INTERFACES_H
#define MUSICXML_INTERFACES_H

#ifdef __cplusplus
extern "C" {
#endif

void musicxml_init(void);

/**
 * Part of C API used for the Node plugin (../node/main.cpp)
 *
 * Converts an uncompressed MusicXML file (timewise or partwise) to a MXMLJSON string.
 * The returned string must be freed by calling musicxml_freeString.
 */
const char *musicxml_xmlToJson(const char *buffer, int bufferLen);

/**
 * Part of C API used for the Node plugin (../node/main.cpp)
 *
 * Frees a string that has been created by a musicxml_* function.
 * Must be called in same thread as the string was created.
 */
void musicxml_freeString(const char *buffer);

#ifdef __cplusplus
}
#endif

#endif // MUSICXML_INTERFACES_H
