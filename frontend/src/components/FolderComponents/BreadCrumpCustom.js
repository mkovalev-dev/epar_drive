import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
}

export default function BreadCrumbCustom({ routes }) {
  return <Breadcrumb itemRender={itemRender} routes={routes} />;
}
