import getdocs2ts from 'getdocs2ts';
import * as fs from 'fs';
import { join } from 'path';


/**
 * Compiles a getdocs package to a file suitable for DefinitelyTyped.
 */
class Compiler {
    private outRoot: string;

    constructor(outRoot: string) {
        this.outRoot = outRoot;
    }

    compile(name: string): void {
        console.log(`> ${name}`);
        const module = buildModule(name, join(this.outRoot, name, 'index.d.ts'));
        getdocs2ts([module], externalsFor(name));
    }
}


interface Module {
    name: string;
    srcFiles: string;
    outFile: string;
    header?: string;
}

function buildModule(name: string, outFile: string): Module {
    const majorMinor = majorMinorVersion(json(join(name, 'package.json')).version);
    return {
        name,
        srcFiles: join(name, 'src', '*.js'),
        outFile,
        header:
`// Type definitions for ${name} ${majorMinor}
// Project: https://github.com/ProseMirror/${name}
// Definitions by: Bradley Ayers <https://github.com/bradleyayers>
//                 David Hahn <https://github.com/davidka>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

`
    }
}

function majorMinorVersion(version: string): string {
    return version.split('.').slice(0, 2).join('.');
}

function json(path: string): any {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

const externals: TypeInfos = {
    // prosemirror-markdown
    MarkdownParser: { definedIn: 'prosemirror-markdown' },
    MarkdownSerializer: { definedIn: 'prosemirror-markdown' },

    // prosemirror-model
    DOMParser: { definedIn: 'prosemirror-model' },
    DOMSerializer: { definedIn: 'prosemirror-model' },
    Fragment: { definedIn: 'prosemirror-model' },
    Node: { definedIn: 'prosemirror-model' },
    NodeSpec: { definedIn: 'prosemirror-model' },
    NodeType: { definedIn: 'prosemirror-model' },
    Mark: { definedIn: 'prosemirror-model' },
    MarkSpec: { definedIn: 'prosemirror-model' },
    MarkType: { definedIn: 'prosemirror-model' },
    NodeRange: { definedIn: 'prosemirror-model' },
    ResolvedPos: { definedIn: 'prosemirror-model' },
    Schema: { definedIn: 'prosemirror-model' },
    Slice: { definedIn: 'prosemirror-model' },

    // prosemirror-state
    EditorState: { definedIn: 'prosemirror-state' },
    Plugin: { definedIn: 'prosemirror-state' },
    PluginSpec: { definedIn: 'prosemirror-state' },
    Selection: { definedIn: 'prosemirror-state' },
    Transaction: { definedIn: 'prosemirror-state' },

    // prosemirror-transform
    Mapping: { definedIn: 'prosemirror-transform' },
    Mappable: { definedIn: 'prosemirror-transform' },
    MapResult: { definedIn: 'prosemirror-transform' },
    Step: { definedIn: 'prosemirror-transform' },
    Transform: { definedIn: 'prosemirror-transform' },

    // prosemirror-view
    EditorProps: { definedIn: 'prosemirror-view' },
    EditorView: { definedIn: 'prosemirror-view' },

    // prosemirror (legacy)
    ProseMirror: { definedIn: 'prosemirror' },

    // dom.*
    'dom.Document': { replaceBy: 'Document' },
    'dom.DocumentFragment': { replaceBy: 'DocumentFragment' },
    'dom.Element': { replaceBy: 'Element' },
    'dom.Event': { replaceBy: 'Event' },
    'dom.KeyboardEvent': { replaceBy: 'KeyboardEvent' },
    'dom.MouseEvent': { replaceBy: 'MouseEvent' },
    'dom.MutationRecord': { replaceBy: 'MutationRecord' },
    'dom.Node': { replaceBy: 'Node' },

    // other
    OrderedMap: { definedIn: 'orderedmap' },
}

type TypeInfos = { [type: string]: TypeInfo };

interface TypeInfo {
    replaceBy?: string;
    definedIn?: string;
}

function externalsFor(name: string): TypeInfos {
    const filtered: TypeInfos = {};
    Object.keys(externals)
        .filter(type => externals[type].definedIn !== name)
        .forEach(type => filtered[type] = externals[type]);
    return filtered;
}

const compiler = new Compiler('../DefinitelyTyped/types/');

compiler.compile('prosemirror-collab');
compiler.compile('prosemirror-commands');
compiler.compile('prosemirror-dropcursor');
compiler.compile('prosemirror-history');
compiler.compile('prosemirror-inputrules');
compiler.compile('prosemirror-keymap');
compiler.compile('prosemirror-markdown');
compiler.compile('prosemirror-menu');
compiler.compile('prosemirror-model');
compiler.compile('prosemirror-schema-basic');
compiler.compile('prosemirror-schema-list');
compiler.compile('prosemirror-schema-table');
compiler.compile('prosemirror-state');
compiler.compile('prosemirror-test-builder');
compiler.compile('prosemirror-transform');
compiler.compile('prosemirror-view');