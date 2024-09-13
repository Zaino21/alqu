// scriptprofile.js

const profileForm = document.getElementById('profileForm');
const nicknameInput = document.getElementById('nickname');
const previewProfilePic = document.getElementById('previewProfilePic');
const profilePicCard = document.getElementById('profilePicCard');
const previewNickname = document.getElementById('previewNickname');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementsByClassName('close')[0];
const musicSelect = document.getElementById('musicSelect');
const musicSlider = document.getElementById('musicSlider');
const sliderStartTime = document.getElementById('sliderStartTime');
const sliderEndTime = document.getElementById('sliderEndTime');

// Carrega os dados do perfil do localStorage
const loadProfileData = () => {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        console.log('Loaded profile data:', profileData);
        nicknameInput.value = profileData.nickname || '';
        previewNickname.textContent = profileData.nickname || '';
        previewProfilePic.src = profileData.profilePic || 'vidraçasperfil/vidraça1.gif';
        profilePicCard.src = profileData.profilePic || 'vidraçasperfil/vidraça1.gif';
        musicSlider.value = profileData.profileMusicStart || 0;
        updateSliderTime(profileData.profileMusicStart || 0);

        // Verifica se a música está salva no profileData e ajusta o <select>
        if (profileData.profileMusic) {
            // Espera o DOM carregar completamente antes de aplicar o valor
            document.addEventListener('DOMContentLoaded', () => {
                const optionExists = Array.from(musicSelect.options).some(option => option.value === profileData.profileMusic);
                if (optionExists) {
                    musicSelect.value = profileData.profileMusic;
                } else {
                    musicSelect.value = ''; // Caso não haja música salva, volta para a opção padrão
                }
            });
        }
    }
};

// Função para salvar o perfil no localStorage e sessionStorage
const saveProfile = (profileData) => {
    console.log('Saving profile data:', profileData);
    profileData.vidracaAnimacaoFeliz = 'vidraçasperfil/vidraça1.1.gif';
    profileData.vidracaAnimacaoTriste = 'vidraçasperfil/vidraça1.2.gif';
    
    // Salvando no localStorage
    localStorage.setItem('profileData', JSON.stringify(profileData));

    // Salvando também no sessionStorage para exibição no final do jogo
    sessionStorage.setItem('profileData', JSON.stringify(profileData));
};

// Função para mostrar o popup de vidraças
document.getElementById('chooseGlassBtn').addEventListener('click', function() {
    document.getElementById('glassPopup').style.display = 'block';
});

// Função para fechar o popup de vidraças
document.getElementById('closeGlassPopup').addEventListener('click', function() {
    document.getElementById('glassPopup').style.display = 'none';
});

// Função para selecionar uma vidraça e atualizar a imagem de pré-visualização
document.querySelectorAll('.glass-option').forEach(function(option) {
    option.addEventListener('click', function() {
        const selectedImage = this.getAttribute('data-img');
        document.getElementById('previewProfilePic').src = selectedImage;
        document.getElementById('glassPopup').style.display = 'none';
    });
});

// Abre o modal da imagem de perfil
const openModal = () => {
    profilePicCard.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = profilePicCard.src;
    });
};

// Fecha o modal
const closerModal = () => {
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

// Atualiza o tempo no slider
const updateSliderTime = (start) => {
    sliderStartTime.textContent = formatTime(start);
    sliderEndTime.textContent = formatTime(Math.min(parseFloat(start) + 30, 180)); // Ajustar o valor 180 conforme necessário
};

// Formata o tempo em minutos e segundos
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

// Envia o formulário e salva o perfil
const sendSubmit = () => {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const profilePic = previewProfilePic.src;
        const nickname = nicknameInput.value;
        const profileMusic = musicSelect.value;
        const profileMusicStart = musicSlider.value;
        saveProfile({ nickname, profilePic, profileMusic, profileMusicStart });
        previewNickname.textContent = nickname;
    });
};

// Rastreia mudanças no select de música e no slider
const trackMusicChanges = () => {
    musicSelect.addEventListener('change', () => {
        const profilePic = previewProfilePic.src;
        const nickname = nicknameInput.value;
        const profileMusic = musicSelect.value;
        const profileMusicStart = musicSlider.value;
        saveProfile({ nickname, profilePic, profileMusic, profileMusicStart });
    });

    musicSlider.addEventListener('input', () => {
        updateSliderTime(musicSlider.value);
    });

    musicSlider.addEventListener('change', () => {
        const profilePic = previewProfilePic.src;
        const nickname = nicknameInput.value;
        const profileMusic = musicSelect.value;
        const profileMusicStart = musicSlider.value;
        saveProfile({ nickname, profilePic, profileMusic, profileMusicStart });
    });
};

// Lógica principal para carregar o perfil e inicializar interações
const logicProfile = () => {
    loadProfileData();
    openModal();
    closerModal();
    sendSubmit();
    trackMusicChanges();
};

document.addEventListener('DOMContentLoaded', logicProfile);
