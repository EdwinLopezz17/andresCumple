class Cards {
    constructor(id, name, phrase, imageUrl) {
        this.id = id;
        this.name = name;
        this.phrase = phrase;
        this.imageUrl = imageUrl;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const friendsContainer = document.getElementById('friends-container');
    const cardsData = [];

    try {
        const response = await fetch('https://enduser.up.railway.app/cards');
        const friendsData = await response.json();

        friendsData.forEach(friend => {
            const card = new Cards(friend.id, friend.name, friend.phrase, friend.imageUrl);
            cardsData.push(card);
        });

        friendsContainer.innerHTML = '';
        cardsData.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-id', card.id); // Asociar el ID al elemento DOM
            cardElement.innerHTML = `
                <img src="${card.imageUrl}" alt="Foto de ${card.name}">
                <div class="card-icons">
                    <div class="card-icon upload-image">📷</div>
                    <div class="card-icon edit-quote">✏️</div>
                </div>
                <h4>${card.name}</h4>
                <p>"${card.phrase}"</p>
                <!-- Editor de frase oculto por defecto -->
                <div class="edit-container" style="display: none;">
                    <textarea class="edit-phrase" rows="4" cols="50">${card.phrase}</textarea>
                    <div class="edit-actions">
                        <button class="update-quote">Actualizar</button>
                        <button class="cancel-edit">Cancelar</button>
                    </div>
                </div>
            `;
            friendsContainer.appendChild(cardElement);
        });

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        friendsContainer.innerHTML = '<p>Error al cargar las cards. Intenta de nuevo más tarde.</p>';
    }

    // Event delegation for image upload and quote editing
    friendsContainer.addEventListener('click', (e) => {
        const cardElement = e.target.closest('.card');
        if (!cardElement) return;

        const cardId = cardElement.getAttribute('data-id');
        const card = cardsData.find(c => c.id == cardId);

        // Subir imagen
        const uploadBtn = e.target.closest('.upload-image');
        if (uploadBtn) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.addEventListener('change', async (event) => {
                const file = event.target.files[0];
                if (file) {
                    // Leer la imagen para actualizarla en el DOM
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        cardElement.querySelector('img').src = e.target.result; // Actualizar la imagen en el DOM
                        card.imageUrl = e.target.result; // Actualizar también en el objeto

                        // Ahora enviamos la imagen al servidor
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        try {
                            const uploadResponse = await fetch(`https://enduser.up.railway.app/cards/${card.id}/upload-image`, {
                                method: 'POST',
                                body: formData,
                            });

                            if (uploadResponse.ok) {
                                const result = await uploadResponse.text();
                                console.log(result); // Respuesta del servidor con la URL de la imagen
                            } else {
                                console.error('Error al subir la imagen al servidor');
                            }
                        } catch (error) {
                            console.error('Error al enviar la imagen al servidor:', error);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
            fileInput.click();
        }

        // Editar frase
        const editBtn = e.target.closest('.edit-quote');
        if (editBtn) {
            const quoteElement = cardElement.querySelector('p');
            const currentQuote = quoteElement.textContent.replace(/^"|"$/g, '');
            const editContainer = cardElement.querySelector('.edit-container');
            const textarea = editContainer.querySelector('.edit-phrase');

            // Mostrar el editor con la frase actual
            textarea.value = currentQuote;
            editContainer.style.display = 'block';
            quoteElement.style.display = 'none'; // Ocultar la frase

            // Botón de cancelar
            const cancelBtn = editContainer.querySelector('.cancel-edit');
            cancelBtn.addEventListener('click', () => {
                editContainer.style.display = 'none';
                quoteElement.style.display = 'block'; // Volver a mostrar la frase original
            });

            // Botón de actualizar
            const updateBtn = editContainer.querySelector('.update-quote');
            updateBtn.addEventListener('click', async () => {
                const newQuote = textarea.value.trim();
                if (newQuote && newQuote !== currentQuote) {
                    try {
                        const response = await fetch(`https://enduser.up.railway.app/cards/${card.id}/edit-phrase`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ phrase: newQuote })
                        });

                        if (response.ok) {
                            card.phrase = newQuote; // Actualizar en el objeto
                            quoteElement.textContent = `"${newQuote}"`;
                            editContainer.style.display = 'none';
                            quoteElement.style.display = 'block'; // Mostrar la nueva frase
                        } else {
                            alert('Error al actualizar la frase');
                        }
                    } catch (error) {
                        console.error('Error al actualizar la frase:', error);
                        alert('Error al actualizar la frase');
                    }
                }
            });
        }
    });

    // Segundo event listener para la visibilidad del hero2 (sin cambios)
    const hero = document.querySelector('.hero');
    const hero2 = document.querySelector('.hero2');

    const handleHero2Visibility = () => {
        if (window.innerWidth < 700) {
            hero2.style.display = 'none';
        } else {
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
        }
    };

    handleHero2Visibility();
    window.addEventListener('resize', handleHero2Visibility);
});
