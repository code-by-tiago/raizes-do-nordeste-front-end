# Raízes do Nordeste — pedido digital

**Aluno:** Tiago da Silva Souza  
**RU:** 4177326

## Demonstração

- **Aplicação publicada:** https://code-by-tiago.github.io/raizes-do-nordeste-front-end/
- **Repositório:** https://github.com/code-by-tiago/raizes-do-nordeste-front-end

## Executar localmente

1. Clone ou baixe este repositório.
2. Abra `index.html` em um navegador moderno ou use a extensão Live Server.
3. Não há dependências nem etapa de compilação: o protótipo usa HTML, CSS e JavaScript nativos.

## Objetivo e escopo

O protótipo atende o cliente de uma cafeteria nordestina que precisa consultar o cardápio da unidade, montar um pedido, escolher a forma de recebimento, consentir com o tratamento mínimo de dados, simular o pagamento externo e acompanhar o preparo.

### Requisitos e critérios de aceite

| ID | Requisito | Critério de aceite |
| --- | --- | --- |
| RF01 | Consultar cardápio | Produtos, categorias, preços e unidade ativa aparecem no menu. |
| RF02 | Montar sacola | Adicionar, aumentar, diminuir e remover itens recalcula quantidade e total. |
| RF03 | Finalizar pedido | Nome, forma de recebimento e consentimento são validados antes do pagamento. |
| RF04 | Pagamento externo | O protótipo oferece estados aprovado e recusado sem coletar cartão. |
| RF05 | Acompanhar pedido | A aprovação exibe número do pedido e estados de preparo. |
| RNF01 | Acessibilidade | HTML semântico, labels, foco visível, tabs e mensagens anunciadas por leitor de tela. |
| RNF02 | Privacidade | O consentimento é explícito; preferências de marketing ficam separadas e revogáveis. |
| RNF03 | Responsividade | O layout adapta menu, checkout e benefícios para telas pequenas e grandes. |

## Fluxo principal

`Cardápio → Sacola → Checkout → Pagamento externo → Acompanhamento`

Fluxos alternativos: sacola vazia, pagamento recusado, consentimento ausente, nome inválido, gerenciamento de preferências e navegação por categoria.

## Entrega

- `index.html`, `styles.css`, `accessibility.css` e `app.js`: aplicação navegável.
- `relatorio.html`: documento técnico pronto para **Imprimir > Salvar como PDF**.


## Fluxos demonstrados

1. Cardápio por categoria e unidade.
2. Sacola com alteração de quantidades.
3. Checkout com escolha de retirada e consentimento LGPD.
4. Pagamento externo simulado com sucesso ou falha.
5. Acompanhamento do pedido.
6. Programa de fidelidade e preferências de privacidade.

## Plano de testes manual

| Cenário | Passos | Resultado esperado |
| --- | --- | --- |
| Adicionar item | Menu > Adicionar | Contador da sacola aumenta e uma confirmação é anunciada. |
| Ajustar quantidade | Sacola > `+`/`−` | Quantidade e total são atualizados; item sai ao chegar a zero. |
| Checkout inválido | Continuar sem consentimento ou nome | Formulário impede avanço e informa como corrigir. |
| Pagamento recusado | Checkout válido > falha | Retorna ao checkout mantendo a sacola e mostra orientação. |
| Pagamento aprovado | Checkout válido > aprovado | Gera pedido e mostra acompanhamento. |
| Privacidade | Fidelidade > Gerenciar preferências | Preferência é salva localmente e pode ser alterada. |
| Responsividade | Redimensionar para celular | Conteúdo permanece legível e navegável sem rolagem horizontal. |

## Limitações e próximos passos

Este é um protótipo front-end: catálogo, pagamento e status usam dados simulados e `localStorage`. Em produção, a integração deve usar autenticação, API, provedor de pagamentos hospedado, consentimento versionado e armazenamento seguro no servidor.
