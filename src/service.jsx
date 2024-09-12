export async function EnviarArquivo(arquivo, conta, agencia) {
    if (!arquivo) return;

    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
            const base64File = reader.result.split(',')[1];
            const json = {
                formato: arquivo.type,
                token: 0,
                agencia: agencia,
                conta: conta,
                arquivo: base64File
            };

            try {
                const response = await fetch('http://192.168.50.87:5000/ofx/converter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(json)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error('ERR: ' + errorText);
                }

                const data = await response.json();
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsDataURL(arquivo);
    });
}

export async function atualizarJson(dadosJson, setDadosJson, indice, chave, valor) {
    const dadosAtualizados = [...dadosJson];
    dadosAtualizados[indice][chave] = valor;
    setDadosJson(dadosAtualizados);
}

export async function deletarItem(dadosJson, setDadosJson, exibirPagina, configurarPaginacao, paginaAtual, indice) {
    const dadosAtualizados = dadosJson.filter((_, i) => i !== indice);
    setDadosJson(dadosAtualizados);
    exibirPagina(paginaAtual);
    configurarPaginacao();
}

export async function baixarOFX(dadosJson, nome_pdf, agencia, conta) {
    try {
        const json = {
            token: 0,
            agencia: agencia,
            conta: conta,
            arquivo: dadosJson
        };

        const response = await fetch('http://192.168.50.87:5000/ofx/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${nome_pdf}.ofx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); 
    } catch (error) {
        document.getElementById('resposta').textContent = 'Erro: ' + error.message;
    }
}
