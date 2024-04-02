const { Builder, By } = require("selenium-webdriver");
const fs = require('fs');
const path = require("path");

async function ctLoginComSucesso(driver) {
    try {
        await driver.get("https://pt-br.facebook.com/login/device-based/regular/login/");
        await aguardarSegundos(5);

        const nomeCt = "LoginSucesso";
        const username = "usuario_valido";
        const password = "senha_valido";

        await executaLogin(driver, username, password);

        const expectedText = "Amigos";
        const element = await driver.findElement(By.xpath("//*[@id='mount_0_0_B4']/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/div[1]/ul/li[1]/div/a/div[1]/div[2]/div/div/div/div/span/span"));
        const text = await element.getText();

        console.log('\n******************************\n' + text + '\n' + expectedText + '\n*******************************\n');
        const result = text === expectedText;

        if (result) {
            await geraEvidencia(driver, "", "evi_" + nomeCt + "_OK.png");
            console.log('\nTeste passou\n');
        } else {
            await geraEvidencia(driver, "", "evi_" + nomeCt + "_NOK.png");
        }
    } catch (error) {
        console.error('\nTeste falhou********************************\n', error);
    }
}

async function ctEmailIncorreto(driver) {
    try {
        await driver.get("https://pt-br.facebook.com/login/device-based/regular/login/");
        await aguardarSegundos(5);

        const nomeCt = "EmailIncorreto";
        const username = "emailEamil";
        const password = "senhaSenha";

        await executaLogin(driver, username, password);

        const expectedText = "O email ou o número de celular que você inseriu não está conectado a uma conta. Encontre sua conta e entre.";
        const element = await driver.findElement(By.xpath("//*[@id='email_container']/div[2]"));
        const text = await element.getText();

        console.log('\n******************************\n' + text + '\n' + expectedText + '\n*******************************\n');
        const result = text === expectedText;

        if (result) {
            await geraEvidencia(driver, "", "evi_" + nomeCt + "_OK.png");
            console.log('\nTeste passou\n');
        } else {
            await geraEvidencia(driver, "", "evi_" + nomeCt + "_NOK.png");
        }
    } catch (error) {
        console.error('\nTeste falhou********************************\n', error);
    }
}

async function ctSenhaIncorreta(driver) {
    try {
        await driver.get("https://pt-br.facebook.com/login/device-based/regular/login/");
        await aguardarSegundos(5);

        const nomeCt = "SenhaIncorreto";
        const username = "email@gmail.com";
        const password = "senhaSenha";

        await executaLogin(driver, username, password);

        const expectedText = "A senha que você inseriu está incorreta.\nEsqueceu a senha?";
        const element = await driver.findElement(By.xpath("//*[@id='loginform']/div[2]/div[2]"));
        const text = await element.getText();

        console.log('\n******************************\n' + text + '\n' + expectedText + '\n*******************************\n');
        const result = text === expectedText;

        if (result) {
            await geraEvidencia(driver, "", "evi_" + nomeCt + "_OK.png");
            console.log('\nTeste passou\n');
        } else {
            await geraEvidencia(driver, "", "evi_" + nomeCt + "_NOK.png");
        }
    } catch (error) {
        console.error('\nTeste falhou********************************\n', error);
    }
}

async function ctSemPreencher(driver) {
    try {
        await driver.get("https://pt-br.facebook.com/login/device-based/regular/login/");
        await aguardarSegundos(5);

        const nomeCt = "SemPreencher";
        const username = "";
        const password = "";

        await executaLogin(driver, username, password);

        const expectedText = "O email ou o número de celular que você inseriu não está conectado a uma conta. Encontre sua conta e entre.";
        const element = await driver.findElement(By.xpath("//*[@id='email_container']/div[2]"));
        const text = await element.getText();

        console.log('\n******************************\n' + text + '\n' + expectedText + '\n*******************************\n');
        const result = text === expectedText;

        if (result) {
            await geraEvidencia(driver, "", "evi_" + nomeCt + "_OK.png");
            console.log('\nTeste passou\n');
        } else {
            await geraEvidencia(driver, "", "evi_" + nomeCt + "_NOK.png");
        }
    } catch (error) {
        console.error('\nTeste falhou********************************\n', error);
    }
}

async function executaLogin(driver, username, password) {
    const elementoUsuario = "//*[@id='email']";
    const elementoSenha = "//*[@id='pass']";

    await preencherCampo(driver, elementoUsuario, username);
    await aguardarSegundos(1);

    await preencherCampo(driver, elementoSenha, password);
    await aguardarSegundos(1);

    await clicar(driver, "//*[@id='loginbutton']");
    await aguardarSegundos(1);
}

async function preencherCampo(driver, elemento, texto) {
    const inputEle = await driver.findElement(By.xpath(elemento));
    await inputEle.sendKeys(texto);
}

async function clicar(driver, elemento) {
    const inputEle = await driver.findElement(By.xpath(elemento));
    await inputEle.click();
}

async function aguardarSegundos(segundos) {
    await new Promise(resolve => setTimeout(resolve, segundos * 1000));
}

async function geraEvidencia(driver, local, nome) {
    const screenshot = await driver.takeScreenshot();
    const filePath = path.join(__dirname, local, nome);
    fs.writeFileSync(filePath, screenshot, 'base64');
    console.log('Screenshot taken and saved at:', filePath);
}


async function executarTeste() {
    const driver = new Builder().forBrowser("chrome").build();

    try {
        await ctLoginComSucesso(driver);
    } catch (error) {
        console.error("Erro ao executar teste de login com sucesso:", error);
        await geraEvidencia(driver, "", "evi_LoginSucesso_NOK.png");
        console.log("erro***************************************");
    }

    // try {
    //     await ctEmailIncorreto(driver);
    // } catch (error) {
    //     console.error("Erro ao executar teste de email incorreto:", error);
    //     await geraEvidencia(driver, "", "evi_EmailIncorreto_NOK.png");
    // }

    // try {
    //     await ctSenhaIncorreta(driver);
    // } catch (error) {
    //     console.error("Erro ao executar teste de senha incorreta:", error);
    //     await geraEvidencia(driver, "", "evi_SenhaIncorreta_NOK.png");
    // }

    // try {
    //     await ctSemPreencher(driver);
    // } catch (error) {
    //     console.error("Erro ao executar teste de senha incorreta:", error);
    //     await geraEvidencia(driver, "", "evi_SemPreencher_NOK.png");
    // }

    await driver.quit();
}


executarTeste();
