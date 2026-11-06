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

Somente uma página fica visível por vez. Role dentro dela para ler conteúdos longos. Ao chegar ao fim, faça um novo gesto para avançar; no topo, um novo gesto para baixo retorna à anterior. Também é possível usar Anterior/Próxima, Índice e as setas do teclado. A inércia do trackpad não avança várias páginas de uma vez. Os endereços com fragmentos, como `#manual`, abrem a tela correspondente. A opção de movimento reduzido do dispositivo é respeitada.

## Internet e compatibilidade

O convite e as fotos funcionam localmente. Google Maps, WhatsApp e as fontes Google (Great Vibes e Cormorant Garamond) precisam de internet. Sem conexão, o navegador usa fontes de reserva. Nenhum print completo é usado como fundo: os textos são selecionáveis e a decoração foi reconstruída com CSS e símbolos tipográficos, exceto o selo, que usa exatamente a imagem enviada. Os ornamentos são uma interpretação das referências, sem reproduzir as ilustrações detalhadas da estátua.

## Verificação

Verificados: sintaxe dos arquivos JavaScript, oito telas, IDs e imagens locais, distribuição do calendário e contagem antes/depois do evento. A prévia visual automatizada não ficou disponível neste ambiente; recomenda-se conferir no navegador local antes de compartilhar.

## Selo atualizado

O selo utiliza `assets/selo-jr.png`, arquivo original enviado, sem redesenho ou filtros. O CSS recorta apenas a área externa ao selo para integrá-lo ao envelope. O clique e a animação de abertura foram preservados.

## Ajuste a celulares

Layout fluido, tamanhos de texto adaptáveis, altura automática para não cortar conteúdo, suporte à área segura do aparelho e agradecimentos em uma coluna nas telas mais estreitas. Funciona também com rotação de tela e zoom. O envelope mantém sua animação; as outras telas podem ser acessadas rolando.

## Abertura do envelope e Safari

Toda visita começa com a capa bloqueada. As demais seções ficam ocultas e inertes; índice, links internos e rolagem não liberam o conteúdo. Ao clicar no selo, uma transição curta remove o envelope e exibe a página 2. A partir daí, a navegação por páginas e o índice ficam disponíveis. Voltar ao início restaura o bloqueio.

A capa usa a altura visível do navegador (Visual Viewport, com fallback), acompanhando a barra de endereço do Safari. O conteúdo seguinte está oculto desde o HTML/CSS inicial, inclusive antes da execução do JavaScript. A conclusão da abertura não depende de eventos de rolagem nem de animationend. O retorno pelo cache de navegação restaura a capa com o selo clicável.

Validação: sintaxe JavaScript e teste automatizado do estado bloqueado, desbloqueio, clique repetido e retorno à capa. Safari/iPhone real não disponível neste ambiente para validação visual.

## Páginas isoladas

As páginas inativas permanecem ocultas e inertes. A área de leitura ocupa o espaço entre o cabeçalho e os controles inferiores, sem mostrar faixas da página anterior ou seguinte. Textos longos continuam acessíveis com rolagem interna; a troca de página ocorre somente em novo gesto no limite ou pelos controles. No mapa, use a área ao redor para navegar entre páginas.
