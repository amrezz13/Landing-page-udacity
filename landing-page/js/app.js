/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */



const navSections = document.querySelectorAll('section')
const navBar = document.getElementById('navbar__list')



/**
 * End Global Variables
 */

// Build menu by iterating through the navSections


navSections.forEach(el => {
  const navBarElement = `<li class='menu__link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`
  navBar.insertAdjacentHTML('beforeend', navBarElement)
})



// Scroll to section on link click by listenting to the click-event in the navBar
navBar.addEventListener('click', e => {
  e.preventDefault()
  const parent = e.target.hasAttribute('data-link')
    ? e.target
    : e.target.parentElement
  const elementToScrollTo = document.getElementById(parent.dataset.link)
  elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'})
})

// Set section and nav link as active using the IntersectionObserver pattern
const callback = entries => {
  entries.forEach(entry => {
    const navBarElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`,
    )
    const section = document.getElementById(entry.target.id)

    if (entry && entry.isIntersecting) {
      navBarElement.classList.add('active')
      section.classList.add('active')
    } else {
      if (navBarElement.classList.contains('active')) {
        navBarElement.classList.remove('active')
      }

      if (section.classList.contains('active')) {
        section.classList.remove('active')
      }
    }
  })
}






// Options for the observer. Most important is the threshold
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6,
}



// Setting an observer with options and a callback which checks if the navelement should be active
// support for all modern browser https://caniuse.com/#feat=intersectionobserver
const observer = new IntersectionObserver(callback, options)
navSections.forEach(el => {
  observer.observe(document.getElementById(el.id))
})
