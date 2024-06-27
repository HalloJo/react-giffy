const Userhint = ({
  loading,
  hintText,
}: {
  loading: boolean;
  hintText: string;
}) => <div className="user-hint">{loading ? "Loading..." : hintText}</div>;

export default Userhint;
