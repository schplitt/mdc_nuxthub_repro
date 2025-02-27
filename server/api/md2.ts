export default defineEventHandler(async (_event) => {
  return {
    md: `
# This is another random markdown file

## With some other content

- [ ] Item 1
- [ ] Item 2
- [x] Item 3
` }
})
