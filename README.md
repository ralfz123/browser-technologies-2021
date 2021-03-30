##### Browser Technologies @cmda-minor-web 2020 - 2021

![Badge stating project is licensed under MIT license](https://img.shields.io/github/license/ralfz123/browser-technologies-2021) ![Badge stating amount of issues open](https://img.shields.io/github/issues/ralfz123/browser-technologies-2021) [![](https://img.shields.io/badge/site--status-up-success)](https://ralfz123.github.io/browser-technologies-2021) [![Badges via shields.io](https://img.shields.io/badge/badges%20via-shields.io-brightgreen)](shields.io)

# iPic - _The online photo gallery creator_
_Browser Technologies, a course of the minor Web Design & Development. It is a minor of the third year from the study [CMD](https://www.cmd-amsterdam.nl/)._

[Link to live version :rocket:](https://ipic-bt-2021.herokuapp.com/)
### Table of Contents
<table style="margin-left: auto; margin-right: auto;">
    <tr>
        <td align="center"><a href="#rocket-purpose-of-project">🚀 Purpose of Project<a></td>
        <td align="center"><a href="#heart_eyes-concept">😍 Concept<a></td>
        <td align="center"><a href="#1234-data">🔢 Data<a></td>
        <td align="center"><a href="#nerd_face-technical-summary">🤓  Technical summary<a></td>
        <td align="center"><a href="#gear-installation">⚙️ Installation<a></td>
        <td align="center"><a href="#file_folder-sources">📁 Sources<a></td>
        <td align="center"><a href="#cop-license">👮 License<a></td>
    </tr> 
</table>

## :rocket: Purpose of Project
//Robuuste, toegankelijke websites ontwerpen en maken …

Één van de mooiste [principes](https://www.w3.org/DesignIssues/Principles.html) van het web is dat iedereen met een computer en een browser het web kan gebruik. [Het web is voor iedereen](https://www.youtube.com/watch?v=UMNFehJIi0E). Het is geen gecontroleerde (programmeer) omgeving, je kan er gerust van uit gaan dat niemand precies hetzelfde te zien krijgt als wat jij in je browser ziet. Er zijn technische beperkingen, zoals afmetingen van de browser, grootte van het apparaat, manier van interactie, kwaliteit van de hardware, kwaliteit van het netwerk en er zijn mensen, allemaal verschillende mensen ...

In het vak Browser Technologies gaan we onderzoeken wat Progressive Enhancement is en hoe je dit kan toepassen om goede, robuuste, toegankelijke websites te maken. Voor iedereen. Het web is voor iedereen, in dit vak leer je hoe je daarvoor kan zorgen.


## Assigment 1
Research to Progressive Enhancement  
[&rarr; Link to live version :rocket:](https://ralfz123.github.io/iPic-BT-2021/assignments/assignment-1/)  
[&rarr; More info ](https://github.com/ralfz123/browser-technologies-2021/blob/master/assignments/assignment-1/README.md#opdracht-1--npm-install-progressive--enhancement)   

## Assigment 2
Research about features from websites on the web
[&rarr; Research link :rocket:](https://github.com/ralfz123/browser-technologies-2021/wiki)  

From my _squad_ we gathered all researches and put it in one [wiki :rocket: ](https://github.com/sjagoori/pe/wiki).


## Assigment 3
[&rarr; Link to live version :rocket:](https://ipic-bt-2021.herokuapp.com/)
## :heart_eyes: Concept
### What's it?
**iPic** is an online photo album where you can upload photos and it generates a photo album for you. You can make photo series from your album and you can see them in a slideshow.

<img src="assignments/assignment-3/concept/app-UI.png" width="700px" />

<!-- <details>
<summary>Happy flow</summary>
<img src="assignments/assignment-3/app-flow.gif" width="400px" />
</details> -->

### Core feature
The user can upload/add photos to the online album.

### Features
**Images**  
- Add image to global online album
- Add information such as title, description, photographer and location of the image
- Check one image with his info at the detail page
- Check all images at the overview page

**Series**  
- Check all series at the overview page
- Check one serie at the detail page
- Show one serie in a slideshow
- Create new series

### Wireflow - Best Enhanced way

<details>
<summary>Part 1</summary>
<img src="assignments/assignment-3/concept/sketch-v1-a.JPG" width=1000px />
</details>

<details>
<summary>Part 2</summary>
<img src="assignments/assignment-3/concept/sketch-v1-b.JPG" width=1000px />
</details>

#### List with layers
Here is a list of the pages how they can be build by the layers _functional_, _usable_ and _pleasurable_.
<details>
<summary>Part 1</summary>
<img src="assignments/assignment-3/concept/buildlist-1.JPG" width=1000px />
</details>

<details>
<summary>Part 2</summary>
<img src="assignments/assignment-3/concept/buildlist-2.JPG" width=1000px />
</details>

### Enhancements
#### 1. FileReader API
With the FileReader API, you can preview the uploaded file. In my case, you can preview the uploaded photo. That's an very enhanced way to the user of presenting the uploaded photo. But when there is no JS available, this feature will be turned off and the default `type=file` content will be presented. When the file is uploaded, you can see the uploaded file as well in string; the filename will be shown.
#### 2. SlideShow
**Functional**  
All photos will be shown in from top to bottom. It's usable and you can see the photos too. 

<details>
<summary>Example</summary>
  <img src="assignments/assignment-3/concept/slideshow-1.gif" width=200px style="display:block;" />
</details>  

**Usable**  
All photos are placed in a nice container where you can scroll horizontal through the photos. Altough the styling makes it easier to use. It's a nice way of viewing the photos.

<details>
<summary>Example</summary>
  <img src="assignments/assignment-3/concept/slideshow-2.gif" width=200px style="display:block;" />
</details>

**Pleasurable**  
Now there are buttons, created with clientside javascript. With these buttons you can interact and decide if you want to see the previous or next photo.

<details>
<summary>Example</summary>
  <img src="assignments/assignment-3/concept/slideshow-3.gif" width=200px style="display:block;" />
</details>

#### 3. CSS Grid replaced by Flexbox
Although Gridbox is very popular, it's not supported at all browsers (see [here](https://caniuse.com/?search=grid)). Therefore I created an enhancement for users that use a browser that not supports CSS Grid. This is a _feature detection_ which checks if the browser supports CSS Grid. If so not, then the fallback is CSS Flexbox, because almost every browser supports Flexbox (see [here](https://caniuse.com/?search=flexbox)).

Although I used two different layout models, I made them so that they look just alike.
<details>
<summary>
  <b>Grid</b>
</summary>
  <img src="assignments/assignment-3/concept/grid-box.gif" width=700px />

  [Code here](https://github.com/ralfz123/iPic-BT-2021/blob/master/static/styles/main.css#L403-L419)
</details>

<details>
<summary>
  <b>Flexbox</b>
</summary>
  <img src="assignments/assignment-3/concept/flex-box.gif" width=700px />

  [Code here](https://github.com/ralfz123/iPic-BT-2021/blob/master/static/styles/main.css#L378-L389)
</details>

#### 4. prefers-reduced-motion
@media (prefers-reduced-motion) voor beweeg-gevoelige (epilepsi)
I wanted to implement an enhancement so browsers can detect if the user prefers a reduced motion on the websites he visits. So the users don't want to be harmed with the (in my experience) cool, fancy, crazy and shaky animations. I did this with `@media (prefers-reduced-motion)`. Check the code [here](https://github.com/ralfz123/iPic-BT-2021/blob/master/static/styles/main.css#L338-L347).

## Browser-testing
Browsers I tested are:

| Device                |      Browser    
|-----------------------|:-------------:
| 1. Desktop            |  Chrome
| 2. Desktop            |  Firefox
| 3. Mobile - iOS       |  Safari
| 4. Mobile - Android   |  Internet


<!-- Requirements:
- Afbeeldingen uitzetten
- Custom fonts uitzetten
- Kleur uitzetten & kleurenblindheid instellen
- Muis/Trackpad werkt niet
- Breedband internet uitzetten
- √ Javascript (volledig)
- √ Cookies niet accepteren
- √ localStorage doet het niet -->



Test list:
1. Upload image
2. File preview
3. Grid layout
4. Create serie
5. Slideshow


### Test rapport
<details>
<summary>Color test</summary>

#### Button
contrast check
hij heeft de WCAG AAA niet voldaan. Deze ga ik aanpassen.
Ik heb m aangepast en hij is nu beter. De contrast ratio is stuk hoger nu.

##### Before - ```#008071```
<img src="assignments/assignment-3/testing/contrast-begin.png" width="100px" />
<img src="assignments/assignment-3/testing/contrast-button.png" width="600px" />

contrast ratio: 4:84

##### After -  ```#006157```
<img src="assignments/assignment-3/testing/contrast-after.png" width="100px" />
<img src="assignments/assignment-3/testing/contrast-button-v2.png" width="600px" />

contrast ratio: 7.37

***

</details>

<details>
<summary>1. Upload image</summary>

#### Desktop - Chrome

Gaat goed, lekker invullen en gaan. Nice layout en werkt helemaal zoals ik wil.

<img src="assignments/assignment-3/testing/1-upload/1-desk-chrome.png" width=500px />



#### Desktop - Firefox
Gaat lekker, niks aan de hand. Ziet er mooi uit.  

<img src="assignments/assignment-3/testing/1-upload/1-desk-firefox.png" width=500px />

#### iOS Mobile - Safari
Upload gaat prima en de safari form default behavior werkt ook lekker. De UI zoomt in en je kan met de pijltjes door de inputs heen 'tabben'. Alleen is de input form styling de default styling van Safari ipv die ik zelf had. Het is overigens niet storend.

<img src="assignments/assignment-3/testing/1-upload/1-mob-ios.PNG" width=200px style="display:block;" />
<img src="assignments/assignment-3/testing/1-upload/1-mob-ios-input.PNG" width=200px style="display:block;" />


#### Android Mobile - Internet
Overall styling is mooi, is iets van het originele (voor iOS gemaakte) af, maar alsnog erg strak. Op deze mobile heb ik wèl de form input styling van de app in plaats van van de browser default.

<img src="assignments/assignment-3/testing/1-upload/1-mob-and.png" width=200px style="display:block;" />

***

</details>

<details>
<summary>2. File preview</summary>


#### Desktop - Chrome
Without JavaScript you see the uploaded file name (default browser feature for the `type=file` input);
<img src="assignments/assignment-3/testing/5-filepreview/5-desk-chrome.png" width=500px />

With JavaScript you see the whole implemented feature of the application:
<img src="assignments/assignment-3/testing/5-filepreview/5-desk-chrome-js.png" width=500px />

#### Desktop - Firefox
Without JavaScript you see the uploaded file name (default browser feature for the `type=file` input):
<img src="assignments/assignment-3/testing/5-filepreview/5-desk-firefox.png" width=500px />

With JavaScript you see the whole implemented feature of the application:
<img src="assignments/assignment-3/testing/5-filepreview/5-desk-firefox-js.png" width=500px />

#### Mobile iOS - Safari
Safari makes his own file preview. That's nice for the user that uses this browser or computer that don't supports JavaScript:
<img src="assignments/assignment-3/testing/5-filepreview/5-mob-ios.PNG" width=200px style="display:block;" />

When you turn on JavaScript, the default Safari filepreview stays existed, but the implemented feature of the application comes next to it:
<img src="assignments/assignment-3/testing/5-filepreview/5-mob-ios-js.PNG" width=200px style="display:block;" />

#### Mobile Android - Internet
Without JavaScript you see the uploaded file name (default browser feature for the `type=file` input):
<img src="assignments/assignment-3/testing/5-filepreview/5-mob-and.JPG" width=200px style="display:block;" />

With JavaScript you see the whole implemented feature of the application:
<img src="assignments/assignment-3/testing/5-filepreview/5-mob-and-js.JPG" width=200px style="display:block;" />

***

</details>

<details>
<summary>3. Grid layout</summary>

#### Desktop - Chrome
Dit werkt top. Het werkt erg fijn en ziet er ook nog is overzichtelijk uit.
<img src="assignments/assignment-3/testing/4-grid/4-desk-chrome.png" width=500px />

#### Desktop - Firefox
Dit werkt erg smooth en layout is strak.
<img src="assignments/assignment-3/testing/4-grid/4-desk-firefox.png" width=500px />

#### Mobile iOS - Safari
Alles is mooi 1-koloms en goed overzichtelijk voor mobiel gebruik
<img src="assignments/assignment-3/testing/4-grid/4-mob-ios.PNG" width=200px style="display:block;" />

#### Mobile Android - Internet
Alles is mooi 1-koloms en goed overzichtelijk voor mobiel gebruik. Strak design op dit device.
<img src="assignments/assignment-3/testing/4-grid/4-mob-and.PNG" width=200px style="display:block;" />

***

</details>

<details>
<summary>4. Create serie</summary>

#### Desktop - Chrome
Gaat lekker en animaties werken lekker. Alleen moet ik steeds scrollen voor de hele foto lijst. Ik zou graag in 1 keer alle foto's willen zien, net zoals op de overview photos page. Hierbij denk ik aan een Grid layout. Kleuren komen trouwens mooi naar voren!

<img src="assignments/assignment-3/testing//2-serieNew/2-desk-chrome.png" width=500px />

#### Desktop - Firefox
Het werkt top, alleen is het natuurlijk dat wanneer je een foto wilt selecteren, dat je dan moet scrollen.

<img src="assignments/assignment-3/testing/2-serieNew/2-desk-firefox.png" width=500px />

Ik heb het probleem aangepakt en verandert naar een Grid layout, waardoor de gebruiker veel makkelijker en sneller zijn images kan toevoegen.

<img src="assignments/assignment-3/concept/create-serie-v2-desk.png" width=500px />

#### Mobile iOS - Safari
Het werkt top, alleen is het natuurlijk dat wanneer je een foto wilt selecteren, dat je dan moet scrollen. Helemaal op mobiel werkt dit dus echt niet fijn, want het is een relatief klein device als je het vergelijkt met desktop. Je moet helemaal naar beneden om op de submit button te klikken. Dit moet dus echt veranderen. Scrollen gaat prima en animaties werken erg fijn.

<img src="assignments/assignment-3/testing/2-serieNew/2-mob-ios.PNG" width=200px style="display:block;" />
<img src="assignments/assignment-3/testing/2-serieNew/2-mob-ios-button.PNG" width=200px style="display:block;" />

Ik heb het probleem aangepakt en verandert naar een Grid layout, waardoor de gebruiker veel makkelijker en sneller zijn images kan toevoegen.

<img src="assignments/assignment-3/concept/create-serie-v2.png" width=200px style="display:block;" />

#### Mobile Android - Firefox
Het werkt top, alleen is het natuurlijk dat wanneer je een foto wilt selecteren, dat je dan moet scrollen. Hier is ook het probleem dat als je het form wilt submitten, je dan helemaal naar beneden moet scrollen.

<img src="assignments/assignment-3/testing/2-serieNew/2-mob-and.png" width=200px style="display:block;" />

<img src="assignments/assignment-3/testing/2-serieNew/2-mob-and-button.png" width=200px style="display:block;" />

Ik heb het probleem aangepakt en verandert naar een Grid layout, waardoor de gebruiker veel makkelijker en sneller zijn images kan toevoegen.

<img src="assignments/assignment-3/concept/create-serie-v2.png" width=200px style="display:block;" />

***

</details>


<details>
<summary>5. Slideshow</summary>

#### Desktop - Chrome
This means for all 4 browsers, I see after the test:
**Functional** - _When CSS & JS are turned off_  
Gaat best en werkt niet super , omdat de images wat groot zijn. Maar het gaat prima.

**Usable** - _When CSS is turned off_  
Gaat stuk beter en ziet er beter uit. Werkt trouwens erg mooi, want je kunt gewoon horizontaal scrollen.

**Pleasurable** - _Fully enhanced way :sprinkles:_  
Dit werkt fantastic, omdat je door middel van buttons naar de vorige en volgende foto kunt gaan.

<img src="assignments/assignment-3/testing/3-slideshow/3-desk-chrome-js.png" width=500px />

#### Desktop - Firefox
De styling van de scrollbar is de default van de browser. Hij heeft niet de styling van de CSS overgenomen.
<img src="assignments/assignment-3/testing/3-slideshow/3-desk-firefox-js.png" width=500px />

#### Mobile iOS - Safari
Werkt erg fijn, verrassend! Werkt mooi en alles is ook goed uitgelijnd.
<img src="assignments/assignment-3/testing/3-slideshow/3-mob-ios.PNG" width=200px style="display:block;" />

#### Mobile Android - Internet
Werkt erg fijn, verrassend! Werkt mooi en alles is ook goed uitgelijnd. Precies mooie styling en werkt erg goed.
<img src="assignments/assignment-3/testing/3-slideshow/3-mob-and.png" width=200px style="display:block;" />

***

</details>



## :1234: Data  
I used Mongoose data schemas to create schemas before I insert the data.
### Image schema
```js
{
  image: String,
  title: String,
  description: String,
  photographer: String,
  location: String,
}
  ```
### Schema schema
```js
{
  titleSerie: String,
  images: Array,
}
  ```

## :nerd_face: Technical summary
This app is built, using:
- _Mobile First technique_
- [npm](https://www.npmjs.com/)
- [Node.js server](https://nodejs.org/)
- [Express router](https://expressjs.com/)
- [EJS Templating engine](https://ejs.co/)
- [Mongoose](https://mongoosejs.com/)
- [Heroku deployment](https://www.heroku.com/nodejs)

## Challenges / Inventions:


## To-Do's :pencil:
<details>
<summary>Expand</summary>

#### App
- [ ] Edit photo --> clientside JS makes form inputs not-disabled (by default disabled)
- [ ] Delete photo

#### Code
- [x] Core feature works
- [x] Connection mongoDB
- [x] multer
- pages render data
    - [x] upload
    - [x] photo overview
    - [x] photo detail
    - [x] series overview
    - [x] series detail
    - [ ] show
        - [ ] carousel
        - [ ] slideshow
- [ ] slideshow
- [ ] order page 3.4 html tags
- [ ] WEB API
- [ ] Fancy menu (clientside JS)
- [ ] Custom fonts?

### Readme
- [ ] Enhancements / Web API's?
- [ ] Test results

#### Backlog 
- [ ] Login, so each user has own pics
- [ ] Geo location API to detect where the user is on browser or he can pick a plot on the map
- [ ] Drag & Drop API
- [ ] "preview in full size (viewport")
</details>


## :gear: Installation
>⚠️ To use the application in development, you need a MongoDB database and a URI to connect with it! Contact me please if you want to run the project.

1. Clone the repository:  
```
git clone https://github.com/ralfz123/iPic-BT-2021.git
```

2. Install dependencies   
```
npm install
```

3. To run the app   
```
npm start
```

4. Go to [localhost](http://localhost:5000/) in the browser and voilà :sparkles:
```
http://localhost:5000/
```

## :file_folder: Sources
Credits to [Koop](https://github.com/KoopReynders) && [Peter Paul Koch](https://www.quirksmode.org/about/) && [Aaron Gustafson](https://github.com/aarongustafson) && [Heydon Pickering](https://github.com/Heydon) && [Ischa Gast](https://ischagast.nl/) for giving interesting lectures about Browser Technologies and Progressive Enhancement and how to deal with it.

### Code sources
- Stackoverflow (n.d.). Searching for answers on dev questions - Stackoverflow. Retrieved 8 March 2021 from https://www.stackoverflow.com

- npm (n.d.). Package manager with many packages - npm. Retrieved 8 March 2021 from https://www.npmjs.com

- FileReader API (n.d.). MDN. Retrieved 25 March 2021 from https://developer.mozilla.org/en-US/docs/Web/API/FileReader

- readAsDataURL (n.d.). MDN. Retrieved 25 March 2021 from https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL

## :cop: License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
This project from [Ralf](https://github.com/ralfz123) has a [MIT © License](https://github.com/ralfz123/browser-technologies-2021/blob/main/LICENSE)
