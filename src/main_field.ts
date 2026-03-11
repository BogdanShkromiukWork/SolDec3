const slide_add_const = document.getElementById('slide_add') as HTMLButtonElement;
const slide_remove_const = document.getElementById('slide_remove') as HTMLButtonElement;
const slides: HTMLDivElement[] = [];
let removeMode = false;
let slidesToRemove: HTMLDivElement[] = [];
slide_add_const.addEventListener('click', () => {
    const slide = document.createElement('div');
    slide.classList.add('main_field');
    const main_field_const = document.getElementById('back_main_field') as HTMLDivElement;
    main_field_const.appendChild(slide);
    slides.push(slide);
});
slide_remove_const.addEventListener('click', () => {
    if (!removeMode) {
        removeMode = true;
        const all_slides = document.querySelectorAll('.main_field') as NodeListOf<HTMLDivElement>;
        all_slides.forEach(slide => {
            slide.addEventListener("mouseenter", () =>{
                slide.style.cursor = "not-allowed";
            });
            slide.addEventListener("mouseleave", () =>{
                slide.style.cursor = "default"
            });
            slide.addEventListener('click', () => {
                const index_to_remove = slidesToRemove.indexOf(slide)
                if (index_to_remove ===-1){
                    slidesToRemove.push(slide);
                    slide.style.backgroundColor = "#CCCCFC"
                    slide.style.borderColor = "#7878B3"
                } else {
                    slidesToRemove.splice(index_to_remove, 1);
                    slide.style.backgroundColor = "white"
                    slide.style.borderColor = "#BAB6B6"
                };
    })     });
    }
    if (removeMode) {
        slidesToRemove.forEach(slide => {
            slide.remove();
        });
        slidesToRemove.length = 0;
        removeMode = false;
    };
});