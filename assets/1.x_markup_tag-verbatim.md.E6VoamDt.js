import{_ as p,r,o as m,c as d,e as l,a as e,d as o,t as n}from"./chunks/framework.CXcwiNg-.js";const x=JSON.parse('{"title":"{% verbatim %} - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[],"relativePath":"1.x/markup/tag-verbatim.md","filePath":"1.x/markup/tag-verbatim.md"}'),u={name:"1.x/markup/tag-verbatim.md"};function b(t,a,g,v,c,h){const s=r("pre-heading"),i=r("post-heading");return m(),d("div",null,[l(s),a[0]||(a[0]=e("h1",null,"{% verbatim %}",-1)),l(i),a[1]||(a[1]=e("p",null,[o("The "),e("code",null,"{% verbatim %}"),o(" tag marks entire sections as being raw text that should not be parsed.")],-1)),e("pre",null,[e("code",null,"{% verbatim %}<p>Hello, "+n(t.name)+`</p>{% endverbatim %}
`,1)]),a[2]||(a[2]=e("p",null,"The above will render in the browser exactly as:",-1)),e("pre",null,[e("code",null,"<p>Hello, "+n(t.name)+`</p>
`,1)]),a[3]||(a[3]=e("p",null,"For example, AngularJS uses the same templating syntax so you can decide which variables to use for each.",-1)),e("pre",null,[e("code",null,"<p>Hello "+n(t.name)+`, this is parsed by Twig</p>

{% verbatim %}
    <p>Hello `+n(t.name)+`, this is parsed by AngularJS</p>
{% endverbatim %}
`,1)])])}const k=p(u,[["render",b]]);export{x as __pageData,k as default};
