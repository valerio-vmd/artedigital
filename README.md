# Digital Studio

Landing page estática em português, preparada para hospedagem compartilhada. Não utiliza PHP, banco de dados ou Node.js no servidor.

## Organização

- `index.html`: conteúdo, seções, formulário e metadados.
- `assets/css/styles.css`: estilos personalizados e acessibilidade.
- `assets/css/tailwind.css`: utilitários compilados, usados em produção.
- `assets/css/tailwind.input.css` e `tailwind.config.cjs`: fontes para gerar os utilitários.
- `assets/js/config.js`: telefone de contato centralizado.
- `assets/js/main.js`: ano do rodapé e links de contato.
- `assets/js/quote-form.js`: seleção dos serviços e mensagem para o WhatsApp.
- `assets/js/particles.js`: animação decorativa, com movimento reduzido e pausa em abas ocultas.
- `assets/images/`: favicon e futuras imagens reais do portfólio.
- `docs/PUBLICACAO.md`: instruções de upload.
- `scripts/check.mjs`: verificação dos arquivos e referências locais.

## Desenvolvimento

Para alterar apenas textos, telefone ou estilos personalizados, edite os arquivos correspondentes. Para adicionar ou modificar classes Tailwind, instale as ferramentas locais e gere novamente o CSS:

```sh
npm ci
npm run build:css
npm run check
```

Node.js é necessário somente para as ferramentas de desenvolvimento. O CSS gerado deve acompanhar o upload. Não use o CDN de desenvolvimento do Tailwind em produção.

## Análise e pontos pendentes

O arquivo original misturava HTML, CSS, configuração Tailwind e JavaScript. Agora esses arquivos têm responsabilidades separadas. O formulário monta uma solicitação de orçamento; ele não calcula preços nem envia dados para um servidor. O envio acontece quando o visitante confirma a mensagem no WhatsApp.

O visual e os textos comerciais foram preservados. Os projetos do portfólio ainda usam representações ilustrativas: substitua por trabalhos reais, imagens e descrições antes de divulgar. Confirme também a marca Digital Studio e o telefone configurado.

Google Fonts e Font Awesome continuam externos e exigem acesso à internet. A página não inclui analytics, cookies de marketing ou banco de dados. Os metadados sociais básicos estão presentes; após definir seu domínio, adicione a URL canônica, `og:url` e uma imagem real de compartilhamento com URL absoluta.
