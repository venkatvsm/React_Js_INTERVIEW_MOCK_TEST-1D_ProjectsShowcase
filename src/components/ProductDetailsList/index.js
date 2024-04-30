import './index.css'

const ProductDetailsList = props => {
  const {productList} = props
  const {imageUrl, name} = productList
  return (
    <li className="ListItemsContainer">
      <img src={imageUrl} alt={name} className="ListItemsImage" />
      <p className="ListItemsPara">{name}</p>
    </li>
  )
}
export default ProductDetailsList
