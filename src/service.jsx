export async function EnviarArquivo(arquivo) {
    if (!arquivo) return;

    // Converte o arquivo para base64
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
            const base64File = reader.result.split(',')[1]; // Obtém a parte base64 do resultado
            const json = {
                formato: arquivo.type,
                token: 0, 
                arquivo: base64File
            };

            try {
                const response = await fetch('http://localhost:5000/ofx/converter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Envia o JSON
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
                const respostaElement = document.getElementById('resposta');
                if (respostaElement) {
                    respostaElement.textContent = 'Erro: ' + error.message;
                } else {
                    console.error('Erro ao enviar o arquivo:', error.message);
                }
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

export async function baixarOFX(dadosJson, nome_pdf) {
    try {
        const response = await fetch('http://localhost:5000/ofx/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosJson)
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
    } catch (error) {
        document.getElementById('resposta').textContent = 'Erro: ' + error.message;
    }
}
