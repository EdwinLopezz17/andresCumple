
document.addEventListener('DOMContentLoaded', () => {
    const friendsContainer = document.getElementById('friends-container');

    const friendsData = [
        { name: 'Oswaldo Colfer', image: './images/oswaldo.jpg', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Fabiola Cuyate', image: './images/fabi.jpg', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Kevin Fernadez', image: './images/kevin.png', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Shantall Castillo', image: './images/shantall.png', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Edwin Lopez', image: './images/edwin.jpg', quote: '\"Tu trabajo y esfuerzo diario son testimonio de tu grandeza como persona. ¡Doc!\"' },
        { name: 'Hercilia Prado', image: './images/hercilia.png', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Marialicia Huamani', image: './images/mari.jpg', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Roberto Romero', image: './images/roberto.png', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Aixa Escudero', image: './images/aixa.png', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Sheyla Frontado', image: './images/sheyla.jpg', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
        { name: 'Ruben Dominguez', image: './images/ruben.jpg', quote: '\"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab nulla sapiente tenetur amet alias. Qui!\"' },
    ];

    friendsData.forEach(friend => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${friend.image}" alt="Foto de ${friend.name}">
            <h4>${friend.name}</h4>
            <p>${friend.quote}</p>
        `;
        friendsContainer.appendChild(card);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const hero2 = document.querySelector('.hero2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                hero2.style.display = 'none';
            } else {

                hero2.style.display = 'block';
            }
        });
    });

    observer.observe(hero);
});

