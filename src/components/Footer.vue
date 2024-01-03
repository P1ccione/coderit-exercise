<template>
    <footer>
        <div class="container">
            <div class="logo-container">
                <img :src="CoderitLogo" alt="">
            </div>
            <p class="footer-text">+39 393 8730542</p>
            <span class="footer-text">
                <a href="info@coderit.it" class="footer-link">info@coderit.it</a>
            </span>
            <p class="footer-text">Via Aosta 4, Milano</p>
            <p class="footer-text">C.F. e P.IVA: 10941240961</p>
            <p class="footer-text">CAP SOC: € 10.000,00 I.V.</p>
            <p class="footer-text">R.E.A.: MI-2568462</p>
            <p class="footer-text">© 2021 CODERIT s.r.l.</p>
            <dv class="footer-links-container">
                <span class="footer-text"><a href="https://www.coderit.it/privacy-cookies" class="footer-link">Cookie & Privacy Policy</a></span>
                <span class="footer-text"><a href="https://startup.registroimprese.it/isin/dettaglioStartup?0&id=KXU3bCJQBfS92AJOXqJVKg%2BWNunnCyIgxKwuUw/how%3D%3D" class="footer-link">Startup Innovative</a></span>
            </dv>
        </div>
    </footer>
</template>

<script>
import CoderitLogo from '@/assets/coderit-logo.png'
export default {
    name: "Footer",
    data () {
        return {
            CoderitLogo: CoderitLogo
        }
    }
}
</script>

<style scoped>
    footer {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #141416;
}

.container {
    width: 100%;
    padding: 50px;
    padding-top: 0;
    display: flex;
    row-gap: 5px;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
}

.logo-container {
    margin-top: 50px;
}

p.footer-text {
    color: white;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

a.footer-link {
    font-size: 1.2rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
}

dv.footer-links-container {
    margin-top: 10px;
}
</style>