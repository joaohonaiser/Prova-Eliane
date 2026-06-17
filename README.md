# Prova-Eliane 🎭 Cosplay World - Catálogo & Loja Virtual

Um e-commerce single-page (SPA) responsivo e minimalista focado na exibição, filtragem e compra de cosplays e acessórios temáticos. O projeto simula a experiência de grandes marketplaces (como o AliExpress), trazendo uma interface limpa onde o produto é o grande destaque.

## ✨ Funcionalidades Principais

* **Vitrine Dinâmica:** Renderização automática de produtos baseada em estruturas de dados nativas do JavaScript (sem necessidade de APIs ou JSONs externos).
* **Filtro de Busca em Tempo Real:** Barra de pesquisa instantânea que filtra títulos e categorias à medida que o usuário digita.
* **Ordenação por Preço:** Organização de produtos por menor ou maior preço de forma reativa.
* **Carrinho de Compras Funcional:** Adição de itens ao carrinho com contador em badge no cabeçalho e salvamento automático do estado no `localStorage` do navegador.
* **Visualização em Detalhes (Lightbox Modal):** Clique nos cards para abrir uma janela de foco isolado com informações ampliadas do cosplay e controle amigável via teclado.
* **Interface Responsiva:** Design mobile-first adaptável a qualquer tamanho de tela (smartphones, tablets e desktops).

## 🚀 Como Executar o Projeto

Por utilizar Módulos JavaScript nativos (`type="module"`), as políticas de segurança dos navegadores exigem que os arquivos sejam abertos por meio de um servidor HTTP local.

### Método 1: Usando o Live Server (Recomendado)
1. Instale a extensão **Live Server** no seu VS Code.
2. Abra a pasta do projeto no editor.
3. No canto inferior direito da janela do VS Code, clique no botão **"Go Live"**.
4. O navegador abrirá automaticamente o site no endereço local (geralmente `http://127.0.0.1:5500`).

### Método 2: Via Terminal (Python)
Se você tiver o Python instalado na máquina, abra o terminal na pasta do projeto e digite:
```bash
python -m http.server 8080