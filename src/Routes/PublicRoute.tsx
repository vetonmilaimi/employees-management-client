interface Props {
  children: React.ReactElement;
}

const PublicRoute = ({ children }: Props) => {
  return children;
};

export default PublicRoute;
