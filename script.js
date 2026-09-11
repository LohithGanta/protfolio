document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");


    const navLinksContainer =
        document.querySelector(".nav-links");


    const navLinks =
        document.querySelectorAll(".nav-link");


    const sideLinks =
        document.querySelectorAll(".side-link");


    const sections =
        document.querySelectorAll("main section");


    const revealElements =
        document.querySelectorAll(".reveal");



    /* =====================================================
       NAVBAR HEIGHT
    ===================================================== */

    const NAVBAR_HEIGHT =
        parseInt(
            getComputedStyle(document.documentElement)
                .getPropertyValue("--navbar-height")
        ) || 70;



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        navLinksContainer?.classList.remove("active");

        menuToggle?.classList.remove("active");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }



    if (menuToggle && navLinksContainer) {

        menuToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                const isOpen =
                    navLinksContainer.classList.toggle(
                        "active"
                    );


                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

    }



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const allNavigationLinks = [
        ...navLinks,
        ...sideLinks
    ];



    allNavigationLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (!target) {

                    console.warn(
                        `Target element "${targetId}" not found`
                    );

                    return;

                }


                event.preventDefault();


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    NAVBAR_HEIGHT;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });


                closeMobileMenu();

            }
        );

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sectionObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    const currentId =
                        entry.target.id;


                    if (!currentId) {

                        return;

                    }


                    navLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    sideLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const activeNav =
                        document.querySelector(
                            `.nav-link[href="#${currentId}"]`
                        );


                    const activeSide =
                        document.querySelector(
                            `.side-link[href="#${currentId}"]`
                        );


                    activeNav?.classList.add(
                        "active"
                    );


                    activeSide?.classList.add(
                        "active"
                    );

                });

            },

            {

                threshold:
                    0.35,

                rootMargin:
                    `-${NAVBAR_HEIGHT}px 0px -35% 0px`

            }

        );



    sections.forEach((section) => {

        sectionObserver.observe(section);

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },

            {

                threshold:
                    0.05,

                rootMargin:
                    "0px 0px 100px 0px"

            }

        );



    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });



    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navLinksContainer ||
                !menuToggle
            ) {

                return;

            }


            const clickedInsideMenu =
                navLinksContainer.contains(
                    event.target
                );


            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 768) {

                closeMobileMenu();

            }

        }
    );



});