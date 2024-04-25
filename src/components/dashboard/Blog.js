import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
      <CardImg top width="100%" src={props.image} alt="Card image cap" />
      <CardBody className="p-4">
        {/* Apply style prop to text components */}
        <CardTitle tag="h5" style={props.style}>{props.title}</CardTitle>
        <CardSubtitle style={props.style}>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3" style={props.style}>{props.text}</CardText>
        <Button color={props.color}>Read More</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;
