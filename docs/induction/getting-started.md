# Getting Started

There is no better way to learn how to swim than jumping in both feet into the deep-end.

With XElement you will find that the &ldquo;deep-end&rdquo; is quiet shallow and the waters are warm.

To gently introduce you to XElement we will be making two very simple components. In building these two components, you will learn to utilize the methods that XElement provides to make your life easier.

The first of these being our maiden `<hello-world>` component, and the second being the defacto `<counter>` component.

## `<HelloWorld>`

Without further ado let's create your first `XElement` component!

We will create an [*explicitly named XElement*](polymorphism#explicitly-declared-custom-elements) using the following syntax:

```jsx
const { HTMLElement : MyComponentName } = XElement
```

Alternatively, you can use the [implicit](polymorphism#) variety in your projects. This approach follows a similar manner as shown above, but we let XElement assign the correct `HTMLElement` for us:

```jsx
const { HTMLElement || ComponentName } = XElement
```

Please note if you are using this method to use Pascal-Case for your naming, including those that are `HTMLElements`



```astro
---
import XElement from 'astro-xelement'
const { h1 : HelloWorld } = XElement
---
<HelloWorld>
    !! Hello World !!
</HelloWorld>
```

This renders as `<h1> !! Hello World !! </h1>`

From here we can make this element do any number of things...

Using **JavaScript** or **TypeScript** we can make this dynamic when certain events are triggered or conditions are met.

An XElement can perform actions if it has been *clicked* on or if it is *visible* or if it has been *resized.* It can even `fetch` data and dynamically `import` files inside the element itself!

What you can do with this little `<HelloWorld>` component is only limited by your imagination.

Let's make our `<HelloWorld>` component fade in, using the **Web Animation API**.

```astro
---
import XElement from 'astro-`xelement`'

const {h1:HelloWorld} = XElement

//Declaring the Keyframe sequence inside Astro
const fadeIn = [
    { 
        opacity: 0
    },
    {
        opacity: 1
    }
];
// Also declaring the timing options
const animationTiming = {
    duration: 1500,
    easing: 'ease-in',
    fill: 'both'
};

---
<HelloWorld
    @animate ={fadeIn}
    @timings ={animationTiming}
>
    !! Hello World !!
<HelloWorld>
```

Now, you should see the text 'Hello-World' fade nicely in to view.

-----------------------

## `<Counter>`

How could we not provide an example of a 'Counter'?

You will notice that Astro starter "framework" examples (e.g. React, Svelte etc.) contain a counter component to show you how various framework components work in Astro.

With XElement, you can have a fully-functioning, interactive *Astro* counter component — no other framework required!


### Let Start

Let's create our own interactive `<Counter>` component. Note that this time, we will need to declare a few different XElements, one to represent each HTML element we wish to create.

Our counter requires two buttons, as well as a counter display. We also need to create a parent `<Counter>` container element. 

We can define all of these elements from XElement at once:

```astro
---
import XElement from 'astro-`xelement`'
const {button:Button, span:Display, Counter} = XElement
---
```

Here we are defining three different types HTML elements to create four distinct HTML elements. (Remember, we're making two buttons. So they are distinct elements in the document, but they are the same type of element!) 

Two types of these *Named Elements* are familiar HTML Elements: `<button>` and `<span>`. The parent component is our `<Counter>` and is not named. It produces an HTML `<counter>` element which is a [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) — a special type of HTML element.

Let's see how we can make our XElement `<Counter>` component **do** some stuff like add, subtract, and display the current count:

```astro
---
import XElement from 'astro-`xelement`'
const {button:Button, span:Display, Counter} = XElement
---
<Counter
    @do={(element,store)=>{
        store.count = 0 
    }}
    >
    
    <Button 
        @click={(event,store)=>{ 
        display.textContent = ++store.count
    }}>
        +
    </Button>
    
    <Display id="display">0</Display>
    
    <Button 
        @click={(event,store)=>{
        display.textContent = --store.count
    }}>
        -
    </Button>
</Counter>
```
### `@` decorators
To start enhancing our component, we use one of the many `@` decorators recognized by `XElement` to specify what type of action we wish it to perform.

`@do` is a common instruction to "do" something, and for our buttons we've used the `@click` decorator to describe an `onClick` action.

### `store`

XElement also provides a `store` that serves as a special non-persistent data object available to all `XElement` components. This lets you *store* your data allowing it to be used elsewhere on the page. As such, we're utilizing the `store` object to keep track of our counter's `count`.

### `id`

Giving an `id` to an XElement — as we have done with `<Display>` — allows us to target that element from elsewhere in the component tree. In this example, we can update the counter's displayed count by referencing our `store`, and using it to change the `<Display>` element's `textContent`.

### Summary 
In this example, what we are asking our  parent element (the `<Counter>`) to **do**  is initialise the `store` with a `count` of `0`. 

Then, we're telling the buttons that when they receive a `click` event, they should increment or decrement the `store.count` respectively; and update the `display.textContent` accordingly.

This `<Counter>` example renders the following HTML to the page:
```html
<counter>
    <button>+</button> 
    <span id="display">0</span>
    <button>-</button> 
</counter>

```

## Next Steps:

### API reference

Visit the API reference docs to find all the `XElement` API reference points and information on how to use each one correctly.

### Guides
Explore our guides to see common/popular ways to use XElement in your project.

### Tutorials
Learn about using XElement by building some sample web components in an example site.


