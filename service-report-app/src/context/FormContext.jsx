import { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

const initialState = {
  projectNo: '', client: '', address: '', contactPerson: '',
  serviceNumber: '', underWarranty: '', dateCalled: '', dateServiced: '',
  reportedProblem: '', actionTaken: '', pendingItems: '',
  nstcNames: '', nstcContactNumber: '', dateIn: '', timeIn: '', dateOut: '', timeOut: '',
  clientRepName: '', clientRepContact: '', clientComments: '', clientDate: '',
  nstcSignature: null,
  clientSignature: null,
};

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('draftReport');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('draftReport', JSON.stringify(formData));
  }, [formData]);

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => setFormData(initialState);

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormData = () => useContext(FormContext);