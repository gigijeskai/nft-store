import React from "react";
import Layout from "../components/layout";
import {
  Container,
  Box,
  Stack,
  Button,
  InputWrapper,
} from "../components/styled";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Formik } from "formik";
import * as yup from "yup";
import { cleanCart, removeFroCart } from "../redux/reducers/cart-reducer";

const validationSchema = yup.object().shape({
  name: yup.string().max(75, "Can not have more than 75 characters").min(2, "min 2 characters").required("one name is required"),
  cognome: yup.string().max(250, "Can not have more than 250 characters").min(2, "min 2 characters").required("one second name is required"),
  card: yup.string().max(25, "Card must have 25 characters").min(25, "Card must have 25 characters").required("Card is required"),
  address: yup.string().max(75, "Can not have more than 75 characters").min(2, "Please insert at least 2 characters").required("Address is required"),
  civico: yup.number().max(9999, "Max 4 digits").positive("Please insert a positive number").moreThan(0, "Please insert a positive number").required("Civico is required"),
  cap: yup.string().max(10, "Allowed max 10 characters").min(3, "Insert at least 3 characters").required("you must provide a valid address"),
});

const initialValue = {
  name: "",
  cognome: "",
  card: "",
  address: "",
  civico: "",
  cap: "",
}

const CheckoutScreen = () => {
const dispatch = useDispatch();
const {cart, total} = useSelector(store => store.cart);

  return (
    <Layout>
      
      <Container size='fullwidth' mb='118px'>
        <Container mt='96px'>
          <Box>
            <h1>Carrello</h1>
          </Box>
          <Stack justify='space-between' spacing='64px' 
          align='start' mt='72px'>
            <Stack direction='column' spacing='48px' flex='1 1 auto'>
              <Stack justify='flex-end'>
                <Button
                  variant='text'
                  size='sm'
                  onClick={() => dispatch(cleanCart())}
                >
                  Remove all
                </Button>
              </Stack>
              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  return (
                    <Box key={item.id}>
                      <Stack justify='space-between' align='start'>
                        <Stack spacing='24px'>
                          <Box
                            position='relative'
                            overflow='hidden'
                            maxWidth='160px'
                            maxHeight='90px'
                            borderRadius='4px'
                            width='100%'
                            height='100%'
                            transform='translateZ(0)'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                          >
                            <img
                              src={item.url}
                              alt='library'
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </Box>
                          <Stack
                            direction='column'
                            align='start'
                            justify='space-between'
                          >
                            <Box color='purple.300'>
                              <h5>Categoria</h5>
                            </Box>
                            <Box>
                              <h6
                                style={{
                                  color: "grey.700",
                                }}
                              >
                                Artista
                              </h6>

                              <p>Titolo - {item.likes}€</p>
                            </Box>
                          </Stack>
                        </Stack>
                        <Button
                          variant='text'
                          size='md'
                          iconColor='purple.300'
                          onClick={ () => { dispatch(removeFroCart(item));
                          }}
                          rightIcon={<RiDeleteBack2Fill size={24} />}
                        ></Button>
                      </Stack>
                    </Box>
                  );
                })
              ) : (
                <h4>Nessun Elemento nel Carrello</h4>
              )}
            </Stack>

            <Box
              border='1px solid'
              borderColor='grey.700'
              borderRadius='8px'
              px='36px'
              py='56px'
              bg='grey.900'
              maxWidth='534px'
            >
              <Box mb='36px'>
                <h3>Dati di pagamento</h3>
              </Box>
<Formik initialValues={initialValue} 
validationSchema={validationSchema}
onSubmit={(values, {setSubmitting}) => setTimeout(() => {
  alert(JSON.stringify(values));
  setSubmitting(false);
},1000)}>
  {
    (
      {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting,
        isValid,
        touched,
        dirty,
      }
    ) =><form onSubmit={handleSubmit}>
    <Stack direction='column' spacing='36px'>
      <Stack justify='space-between' align='center'>
        <Box>
          <InputWrapper
            onChange={handleChange}
            value={values.name}
            width='200px'
            name='name'
            onBlur={handleBlur}
            borderColor={
              errors.name ? "var(--error)" : "initial"
            }
            placeholder='nome'
          />
          {touched.name && errors.name ? (
            <p
              style={{
                color: "var(--error)",
                marginTop: "6px",
                fontSize: "8px",
                textAlign: "right",
              }}
            >
              {errors.name}
            </p>
          ) : (
            <div
              style={{
                height: "8px",
              }}
            ></div>
          )}
        </Box>
        <Box>
          <InputWrapper
            onChange={handleChange}
            value={values.cognome}
            width='200px'
            name='cognome'
            placeholder='cognome'
            borderColor={
              errors.cognome ? "var(--error)" : "initial"
            }
            onBlur={handleBlur}
          />
          {touched.cognome && errors.cognome ? (
            <p
              style={{
                color: "var(--error)",
                marginTop: "6px",
                fontSize: "8px",
                textAlign: "right",
              }}
            >
              {errors.cognome}
            </p>
          ) : (
            <div
              style={{
                height: "8px",
              }}
            ></div>
          )}
        </Box>
      </Stack>
      <Box width='100%'>
        <InputWrapper
          width='100%'
          onChange={handleChange}
          value={values.card}
          placeholder='carta di credito'
          borderColor={errors.card ? "var(--error)" : "initial"}
          name='card'
          onBlur={handleBlur}
        />
        {touched.card && errors.card ? (
          <p
            style={{
              color: "var(--error)",
              marginTop: "6px",
              fontSize: "8px",
              textAlign: "right",
            }}
          >
            {errors.card}
          </p>
        ) : (
          <div
            style={{
              height: "8px",
            }}
          ></div>
        )}
      </Box>
      <Stack spacing='10px' align='center'>
        <Box>
          <InputWrapper
            onChange={handleChange}
            value={values.address}
            width='238px'
            name='address'
            placeholder='Indirizzo'
            borderColor={
              errors.address ? "var(--error)" : "initial"
            }
            onBlur={handleBlur}
          />
          {touched.address && errors.address ? (
            <p
              style={{
                color: "var(--error)",
                marginTop: "6px",
                fontSize: "8px",
                textAlign: "right",
              }}
            >
              {errors.address}
            </p>
          ) : (
            <div
              style={{
                height: "8px",
              }}
            ></div>
          )}
        </Box>
        <Box>
          <InputWrapper
            onChange={handleChange}
            value={values.civico}
            width='100px'
            name='civico'
            placeholder='Numero'
            borderColor={
              errors.civico ? "var(--error)" : "initial"
            }
            onBlur={handleBlur}
          />
          {touched.civico && errors.civico ? (
            <p
              style={{
                color: "var(--error)",
                marginTop: "6px",
                fontSize: "8px",
                textAlign: "right",
              }}
            >
              {errors.civico}
            </p>
          ) : (
            <div
              style={{
                height: "8px",
              }}
            ></div>
          )}
        </Box>
        <Box>
          <InputWrapper
            onChange={handleChange}
            value={values.cap}
            width='100px'
            name='cap'
            placeholder='CAP'
            borderColor={
              errors.name ? "var(--error)" : "initial"
            }
            onBlur={handleBlur}
          />
          {touched.cap && errors.cap ? (
            <p
              style={{
                color: "var(--error)",
                marginTop: "6px",
                fontSize: "8px",
                textAlign: "right",
              }}
            >
              {errors.cap}
            </p>
          ) : (
            <div
              style={{
                height: "8px",
              }}
            ></div>
          )}
        </Box>
      </Stack>
      <Stack justify='space-between' align='center'>
        <h2>{total} €</h2>
        <Button
          type='submit'
          variant={
            isSubmitting || !isValid || !dirty
              ? "disabled"
              : "contained"
          }
          size='md'
          disabled={isSubmitting}
        >
          Procedi all'acquisto
        </Button>
      </Stack>
    </Stack>
  </form>
  }
              
 </Formik>
            </Box>
          </Stack>
        </Container>
      </Container>
    </Layout>
  );
};

export default CheckoutScreen;
