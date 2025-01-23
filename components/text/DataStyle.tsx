import Text from "./Text";

interface DataStyle
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}
function DataStyle({ children, title, ...props }: DataStyle) {
  return (
    <>
      <IsUndefined {...props} value={children} className="flex justify-between">
        <Text type="BodySm(Medium)">{title}:</Text>
        <Text className="text-black/60" type="BodySm">
          {children}
        </Text>
      </IsUndefined>
    </>
  );
}

export default DataStyle;
interface IsU
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value: any;
}
function IsUndefined({ value, children, ...props }: IsU) {
  return <div {...props}>{value != undefined ? children : null}</div>;
}
