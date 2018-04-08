# Diagrams

- [Handlebars Workflow](https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbkhUTUwgLS0-IHxodG1sIHByZXByb2Nlc3N8Zm5jQ29tcGlsZVxuSFRNTCAtLT4gfGh0bWwgcHJlcHJvY2Vzc3xmbmNQcmVjb21waWxlXG5IVE1MIC0tPiB8aHRtbCBwcmVwcm9jZXNzfGZuY0NvbXBpbGVDdXN0b21cbkhUTUwgLS0-fGh0bWwgcHJlcHJvY2Vzc3xmbmNQYXJzZShcIkhhbmRsZWJhcnMucGFyc2UoaHRtbClcIilcbmZuY1BhcnNlIC0tPiBBU1RcbkFTVCAtLT58YXN0IHByZXByb2Nlc3N8Zm5jQ29tcGlsZShcIkhhbmRsZWJhcnMuY29tcGlsZShodG1sfGFzdClcIilcbkFTVCAtLT58YXN0IHByZXByb2Nlc3N8Zm5jUHJlY29tcGlsZShcIkhhbmRsZWJhcnMucHJlY29tcGlsZShodG1sfGFzdClcIilcbkFTVCAtLT58YXN0IHByZXByb2Nlc3N8Zm5jQ29tcGlsZUN1c3RvbShcIkN1c3RvbS5jb21waWxlKGh0bWx8YXN0KVwiKVxuZm5jQ29tcGlsZSAtLT4gRltKUyBUZW1wbGF0ZSBGdW5jdGlvbl1cbkYgLS0-IHxkYXRhfGZuY1RlbXBsYXRlKFwidGVtcGxhdGUoZGF0YSlcIilcbmZuY1ByZWNvbXBpbGUgLS0-IHNwZWNTdHJbVGVtcGxhdGUgU3BlYyBTdHJpbmddXG5zcGVjU3RyIC0tPnxwZXJzaXN0ZW50IHN0b3JhZ2UgcG9pbnR8Zm5jUmV2aXZlKFwicmV2aXZlKHNwZWNTdHIpXCIpXG5mbmNSZXZpdmUgLS0-c3BlY09ialtUZW1wbGV0ZSBTcGVjIE9iamVjdF1cbnNwZWNPYmogLS0-Zm5jUmVzdG9yZShcIkhhbmRsZWJhcnMudGVtcGxhdGUoc3BlY09iailcIilcbmZuY1Jlc3RvcmUgLS0-fG1lbW9yeSBzdG9yYWdlIHBvaW50fEZbVGVtcGxhdGUgSlMgRnVuY3Rpb25dXG5mbmNDb21waWxlQ3VzdG9tIC0tPiBGXG5mbmNUZW1wbGF0ZSAtLT5SSFRNTFtSZW5kZXJlZCBIVE1MXVxuXG5jbGFzc0RlZiBmbmNTdHlsZSBmaWxsOiNmOWYsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjFweDtcblxuY2xhc3MgZm5jUGFyc2UgZm5jU3R5bGU7XG5jbGFzcyBmbmNDb21waWxlIGZuY1N0eWxlO1xuY2xhc3MgZm5jUHJlY29tcGlsZSBmbmNTdHlsZTtcbmNsYXNzIGZuY0NvbXBpbGVDdXN0b20gZm5jU3R5bGU7XG5jbGFzcyBmbmNSZXZpdmUgZm5jU3R5bGU7XG5jbGFzcyBmbmNSZXN0b3JlIGZuY1N0eWxlO1xuY2xhc3MgZm5jVGVtcGxhdGUgZm5jU3R5bGU7XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

```mermaid
graph TD
HTML --> |html preprocess|fncCompile
HTML --> |html preprocess|fncPrecompile
HTML --> |html preprocess|fncCompileCustom
HTML -->|html preprocess|fncParse("Handlebars.parse(html)")
fncParse --> AST
AST -->|ast preprocess|fncCompile("Handlebars.compile(html|ast)")
AST -->|ast preprocess|fncPrecompile("Handlebars.precompile(html|ast)")
AST -->|ast preprocess|fncCompileCustom("Custom.compile(html|ast)")
fncCompile --> F[JS Template Function]
F --> |data|fncTemplate("template(data)")
fncPrecompile --> specStr[Template Spec String]
specStr -->|persistent storage point|fncRevive("revive(specStr)")
fncRevive -->specObj[Templete Spec Object]
specObj -->fncRestore("Handlebars.template(specObj)")
fncRestore -->|memory storage point|F[Template JS Function]
fncCompileCustom --> F
fncTemplate -->RHTML[Rendered HTML]

classDef fncStyle fill:#f9f,stroke:#333,stroke-width:1px;

class fncParse fncStyle;
class fncCompile fncStyle;
class fncPrecompile fncStyle;
class fncCompileCustom fncStyle;
class fncRevive fncStyle;
class fncRestore fncStyle;
class fncTemplate fncStyle;
```