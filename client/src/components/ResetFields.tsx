type resetFieldsProps = {
  resetFields: () => void;
};

const ResetFields: React.FC<resetFieldsProps> = ({
  resetFields,
}: resetFieldsProps) => {
  const handleReset = () => {
    resetFields();
  };
  return (
    <div className="mt-10 mb-10 flex justify-center items-center">
      <button
        type="button"
        className="py-[6px] px-6 bg-red-300 absolute right-[vw/2] rounded-md block md:inline-block"
        onClick={() => {
          handleReset();
        }}
      >
        Reset All Fields
      </button>
    </div>
  );
};

export default ResetFields;
