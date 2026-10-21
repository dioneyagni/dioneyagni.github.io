# dioneyagni.github.io

Portfólio de Dione de Oliveira Alves Martins, publicado pelo GitHub Pages em https://dioneyagni.github.io/.

Site estático, sem build: o GitHub Pages serve os arquivos como estão.

## Arquivos

- `index.html`: todo o conteúdo, dividido em seções comentadas (Abertura, Trabalhos, 3D e protótipos, Como eu trabalho, Trajetória, Formação e ferramentas, Contato).
- `assets/css/site.css`: estilos. As cores ficam no topo, em `:root`, com a versão escura logo abaixo.
- `trabalhos/`: uma página por projeto (Personagens, Foco, Chinelos, Batatinha), com galeria.
- `assets/img/trabalhos/<projeto>/`: imagens dos projetos em WebP. Cada imagem tem duas versões: `nome-p.webp` (miniatura, até 720 px) e `nome.webp` (grande, até 1800 px). As animações estão em `.mp4`, com um `-poster.webp`.
- `assets/js/galeria.js`: abre a imagem grande ao clicar (setas e deslizar para trocar) e toca as animações só quando aparecem na tela.
- `assets/img/3d/`: imagens e modelos `.glb` da seção 3D.

## Adicionar um trabalho

Na seção **Trabalhos**, copie um `<li>` da lista certa (Estampa e produto ou Software) e troque o período, o título e o texto.

## Adicionar uma imagem a um projeto

1. Gere as duas versões da imagem (miniatura e grande) em WebP e coloque em `assets/img/trabalhos/<projeto>/`.
2. Na página do projeto, copie um `<li>` da galeria certa e troque os dois caminhos, `width`/`height` da miniatura, `data-w`/`data-h` da grande e o `alt`.

## Adicionar um trabalho 3D

Dentro da seção **3D e protótipos** há um comentário com o bloco pronto para copiar, tanto para foto quanto para modelo 3D girável (`<model-viewer>`). Quando entrar o primeiro trabalho, apague o parágrafo `class="aguardando"`.

## Ver no computador antes de publicar

Abra o `index.html` direto no navegador, ou rode na pasta do projeto:

```
ruby -run -e httpd . -p 8000
```

e acesse http://localhost:8000.
