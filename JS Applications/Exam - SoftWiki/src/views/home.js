import { html } from '../../node_modules/lit-html/lit-html.js';

import { getCategories } from '../api/func.js'

const homeTemplate = (js, cs, java, py) => html`
    <section id="home-page" class="content">
        <h1>Recent Articles</h1>
        <section class="recent js">
            <h2>JavaScript</h2>
                ${js ? html`<article><h3>${js.title}</h3>
                        <p>${js.content}</p>
                        <a href="/details/${js._id}" class="btn details-btn">Details</a>
                        </article>`
                        :
                        html`<h3 class="no-articles">No articles yet</h3>`
                }
        </section>
        <section class="recent csharp">
            <h2>C#</h2>
            ${cs ? html`<article><h3>${cs.title}</h3>
                        <p>${cs.content}</p>
                        <a href="/details/${cs._id}" class="btn details-btn">Details</a>
                    </article>`
                    :
                    html`<h3 class="no-articles">No articles yet</h3>`
            }
        </section>
        <section class="recent java">
            <h2>Java</h2>
            ${java ? html`<article><h3>${java.title}</h3>
                        <p>${java.content}</p>
                        <a href="/details/${java._id}" class="btn details-btn">Details</a>
                    </article>`
                    :
                    html`<h3 class="no-articles">No articles yet</h3>`
            }
        </section>
        <section class="recent python">
            <h2>Python</h2>
            ${py ? html`<article><h3>${py.title}</h3>
                        <p>${py.content}</p>
                        <a href="/details/${py._id}" class="btn details-btn">Details</a>
                        </article>`
                    :
                    html`<h3 class="no-articles">No articles yet</h3>`
            }
        </section>
    </section>
`
export async function homePage(ctx){
   const data = await getCategories();
   const js = data.find(x => x.category == 'JavaScript');
   const cs = data.find(x => x.category == 'C#');
   const java = data.find(x => x.category == 'Java');
   const py = data.find(x => x.category == 'Python');

    ctx.render(homeTemplate(js, cs, java, py))
}