import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { expenseFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormLabel, Grid } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { Check, Error } from '@mui/icons-material';
import Dropzone from '../../Elements/Dropzone';
import { addNewExpense, updateExpense } from '../../APIs/Expense';
import { SnackbarContext } from '../../Context/SnackbarProvider';

const initialValues = {
  itemName: '',
  purchaseFrom: '',
  purchaseDate: moment().format('YYYY-MM-DD'),
  amount: '',
  selectDoc: ''
};
const AddExpenseForm = ({ isDialogOpen, handleDialog, setIsEdit, selectedData, title, isEdit }) => {
  const [data, setData] = useState(initialValues);
  const { setSnack } = useContext(SnackbarContext);
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log('Selected Data --> ', selectedData);
    if (selectedData !== null) {
      Object.keys(data).map((key) => {
        data[key] = selectedData[key];
        if (key === document) {
          data[key] = selectedData.selectDoc;
        }
      });
      setData(data);
    } else {
      initialValues.purchaseDate = moment().format('YYYY-MM-DD');
      initialValues.itemName = '';
      initialValues.purchaseFrom = '';
      initialValues.amount = '';
      initialValues.selectDoc = '';
      setData(initialValues);
    }
  }, [selectedData]);

  const onSubmitNewExpense = async (formData) => {
    console.log('formData --> ', formData, image, image !== null, image === null);
    let updatedFormData = {};
    let expenseRes;
    if (image !== null) {
      console.log('Execute image if block');
      updatedFormData = {
        itemName: formData.itemName,
        purchaseFrom: formData.purchaseFrom,
        purchaseDate: formData.purchaseDate,
        amount: formData.amount,
        selectDoc: image
      };
    }
    console.log('After set image --> ', updatedFormData);

    if (updatedFormData.selectDoc === undefined || updatedFormData.selectDoc === '') {
      updatedFormData = {
        itemName: formData.itemName,
        purchaseFrom: formData.purchaseFrom,
        purchaseDate: formData.purchaseDate,
        amount: formData.amount
      };
      console.log('Blank Data updatedFormData --> ', updatedFormData);
    } /* else {
      updatedFormData = {
        itemName: formData.itemName,
        purchaseFrom: formData.purchaseFrom,
        purchaseDate: formData.purchaseDate,
        amount: formData.amount,
        selectDoc: image
      };
      console.log('Filled updatedFormData --> ', updatedFormData);
    } */
    if (isEdit) {
      expenseRes = await updateExpense(updatedFormData, selectedData.id);
    } else {
      expenseRes = await addNewExpense(updatedFormData);
    }

    const { status, message } = expenseRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
    }
    handleDialog();
  };

  const uploadFile = (file) => {
    console.log('uploadFile --> ', file[0]);
    setImage(file[0]);
  };

  return (
    <>
      <SideDrawer
        open={Boolean(isDialogOpen)}
        onClose={() => {
          handleDialog();
          setIsEdit(false);
        }}
        title={title}
      >
        <Formik
          enableReinitialize
          initialValues={data}
          onSubmit={(values) => {
            onSubmitNewExpense(values);
          }}
          validationSchema={expenseFormSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12}>
                    <Input
                      placeholder="Item name"
                      label="ITEM NAME"
                      size="large"
                      fullWidth
                      id="itemName"
                      name="itemName"
                      value={values.itemName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.itemName && touched.itemName && errors.itemName}
                      error={errors.itemName && touched.itemName}
                      success={!errors.itemName && touched.itemName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      placeholder="Purchase from"
                      label="PURCHASE FROM"
                      size="large"
                      fullWidth
                      id="purchaseFrom"
                      name="purchaseFrom"
                      value={values.purchaseFrom}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.purchaseFrom && touched.purchaseFrom && errors.purchaseFrom}
                      error={errors.purchaseFrom && touched.purchaseFrom}
                      success={!errors.purchaseFrom && touched.purchaseFrom}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Input
                      type="date"
                      placeholder="Purchase date"
                      label="PURCHASE DATE"
                      size="large"
                      fullWidth
                      id="purchaseDate"
                      name="purchaseDate"
                      defaultValue={values.purchaseDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.purchaseDate && touched.purchaseDate && errors.purchaseDate}
                      error={errors.purchaseDate && touched.purchaseDate}
                      success={!errors.purchaseDate && touched.purchaseDate}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Input
                      type="number"
                      placeholder="Amount"
                      label="AMOUNT"
                      size="large"
                      fullWidth
                      id="amount"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.amount && touched.amount && errors.amount}
                      error={errors.amount && touched.amount}
                      success={!errors.amount && touched.amount}
                      onKeyDown={(evt) =>
                        ['e', 'E', '-', '+'].includes(evt.key) && evt.preventDefault()
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel>SELECT DOCUMENT</FormLabel>
                    <Dropzone
                      options={{
                        autoProcessQueue: false,
                        uploadMultiple: false,
                        addedfiles: (file) => uploadFile(file)
                        // addedfiles: (file) => console.log('Files --> ', file)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={6}>
                    <Button type="submit" color="info" variant="contained" size="medium">
                      Add Expense
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </SideDrawer>
    </>
  );
};

export default AddExpenseForm;
