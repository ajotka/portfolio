# Frontkom icons :

### part of Frontkom Frontend Starter Pack
https://git.frontkom.io/internal/starter-pack-frontend/-/tree/starter-v3/
by AJOTKA


   
<h2 class="h2">CSS Architecture</h2>


+ <strong>0_settings</strong> and <strong>1_tools</strong> used with preprocessors and contain font, colors definitions. Globally used mixins and functions.
+ <strong>2_generic</strong> reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.
+  <strong>3_objects</strong> class-based selectors which define undecorated design patterns, for example media object known from OOCSS

+ <strong>4_elements</strong> styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here. NO BEM!

+ <strong>5_components</strong> specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components. Use BEM <a href="http://getbem.com/naming/" target="_blank">link</a>
+ <strong>6_helpers</strong> - classes with ability to override anything which goes before in the triangle, eg. hide helper class, ex. ```u-font-bold```.


<h2 class="h2">Functions and magic</h2>


+  ```rem($px)``` - Convert px to rem: ```font-size: rem(16);``` =>
	```font-size: 1rem;``` (For base font size: 16px)




<h2 class="h2">Mixins</h2>


+ ```@include rwd($name)``` => ``` @media only screen and (min-width:
	$name) ```
+ ```@include rwdmax($name)``` => ``` @media only screen and (max-width:
	$name-1px) ```
+ ```@include retina()```



<h2 class="h2">RWD - additional breakpoints</h2>

```
"phone":    360px,
"tablet":   834px,
"desktop":  1440px,
"full":     1920px,
"4k":       3840px,
"8k":       7680px,
```

<h2 class="h2">Icons</h2>

The svg sprite has been implemented in the project, which is the default loader for vector files.
It can be used in css styles, in JS code, and directly in HTML.
<br><br>
The package also includes a modifier, thanks to which we can change parameters such as fill or stroke.
Among other things, it facilitates animating icons on pseudo-elements (::before, ::after).
Example of use:


```
/* With sprite */
background-image: url('../../icons/diamond.svg');
background-image: url('../../icons/diamond.svg?fill=red&stroke=blue');

/* Inline - with inline svg */
background-image: url('../../icons/diamond.svg?inline');
background-image: url('../../icons/diamond.svg?inline&fill=red&stroke=blue');
```

SVG files can also be added directly in the code. To get a file from sprite, enter the filename `` sprite.svg ``
and the name of the picture that interests you. Example:

```
<svg fill="#3C373E">
	<use xlink:href="sprite.svg#frontkom"></use>
</svg>

<svg fill="#3C373E">
	<use xlink:href="sprite.svg#frontkom--fill-red"></use>
</svg>
```

# how to use sprite


<img src="https://wolfiesites.com/wp-content/uploads/2021/07/icons-frontkom-pack-sprite-how.png">


##  Building the package with ``npm start`` will do the rest for u!!!