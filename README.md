# Convite de formatura — Dra. Julia Ribeiro

Projeto completo em HTML, CSS e JavaScript puro. Sem instalação de dependências, build ou banco de dados.

## Rodar localmente

1. Extraia o ZIP inteiro.
2. Abra `index.html` no navegador.

Opcional, usando um servidor local com Python 3:

```sh
cd convite-julia
python -m http.server 8080
```

No Windows, se `python` não existir, use `py -m http.server 8080`.
Abra http://localhost:8080. Encerre o servidor com Ctrl+C.
Também funciona com a extensão Live Server do VS Code.

## Trocar as fotos

**Foto da formanda:** substitua `assets/formanda.jpg` por uma foto sua, mantendo o nome. Alternativamente, edite `fotos.formanda` em `config.js`.

**Foto com os pais:** substitua `assets/familia.jpg` ou edite `fotos.familia` em `config.js`.

Há comentários `TROCAR FOTO` junto às imagens em `index.html` e no início de `config.js`. Os retratos incluídos são recortes dos prints fornecidos; a resolução é limitada. Prefira arquivos originais, sem textos ou molduras. Ajuste `object-position` em `.graduate-photo` ou `.family-frame img` no CSS se necessário.

## Personalizar

- `index.html`: textos e estrutura das oito telas.
- `styles.css`: cores, tipografia, molduras, fundos decorativos e animação.
- `config.js`: fotos, WhatsApp, mensagem, endereço e instante da contagem.
- `app.js`: navegação, calendário, contagem e exportação para agenda.

WhatsApp configurado: +55 44 9 9852-2331. O botão abre uma mensagem pronta; o convidado precisa enviá-la no WhatsApp para confirmar. O site não armazena respostas.

Data: **13 de fevereiro de 2027, às 20h30, UTC−3 (Brasília)**. O contador considera esse fuso mesmo em outros países e não exibe valores negativos. Os textos e o calendário são específicos de fevereiro de 2027; ao mudar a data em `config.js`, atualize também o conteúdo estático de `index.html` e a montagem do calendário em `app.js`.

Endereço usado exatamente como informado: Avenida Virgílio Manilia, 21784 - Jardim Ouro Cola, Maringá - PR, 87070-170. O mapa faz uma busca por esse texto; a localização não foi verificada. O link permite abrir o resultado no Google Maps.

## Telas

1. Envelope vinho com selo JR e abertura animada.
2. Save the date, foto e horário.
3. Convite aos amigos e familiares.
4. Agradecimentos a Deus e aos pais, Vanessa e Edimilson.
5. Data, horário, local e Google Maps.
6. Calendário com dia 13 destacado, contador e download de agenda `.ics`.
7. Manual dos convidados e confirmação por WhatsApp.
8. Mensagem final e assinatura.

Use Anterior/Próxima, o Índice ou as setas do teclado. Os endereços com fragmentos, como `#manual`, abrem a tela correspondente. A opção de movimento reduzido do dispositivo é respeitada.

## Internet e compatibilidade

O convite e as fotos funcionam localmente. Google Maps, WhatsApp e as fontes Google (Great Vibes e Cormorant Garamond) precisam de internet. Sem conexão, o navegador usa fontes de reserva. Nenhum print completo é usado como fundo: os textos são selecionáveis e a decoração foi reconstruída com CSS e símbolos tipográficos, exceto o selo, que usa exatamente a imagem enviada. Os ornamentos são uma interpretação das referências, sem reproduzir as ilustrações detalhadas da estátua.

## Verificação

Verificados: sintaxe dos arquivos JavaScript, oito telas, IDs e imagens locais, distribuição do calendário e contagem antes/depois do evento. A prévia visual automatizada não ficou disponível neste ambiente; recomenda-se conferir no navegador local antes de compartilhar.

## Selo atualizado

O selo utiliza `assets/selo-jr.png`, arquivo original enviado, sem redesenho ou filtros. O CSS recorta apenas a área externa ao selo para integrá-lo ao envelope. O clique e a animação de abertura foram preservados.
