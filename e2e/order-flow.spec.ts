import { test, expect, type Page } from '@playwright/test'

const json = (body: unknown) => ({
  status: 200,
  contentType: 'application/json',
  headers: { 'access-control-allow-origin': '*' },
  body: JSON.stringify(body),
})

const points = [
  { id: '1', name: 'Москва', latitude: 55.7558, longitude: 37.6173 },
  { id: '2', name: 'Санкт-Петербург', latitude: 59.9343, longitude: 30.3351 },
]

const packages = [
  {
    id: 'envelope',
    name: 'Конверт',
    length: 42,
    width: 36,
    height: 5,
    weight: 2,
  },
  {
    id: 'box-s',
    name: 'Короб S',
    length: 23,
    width: 19,
    height: 10,
    weight: 2,
  },
]

const options = [
  {
    id: 'opt-default',
    name: 'Стандартная доставка',
    type: 'default',
    price: 318150,
    days: 5,
  },
  {
    id: 'opt-express',
    name: 'Экспресс доставка',
    type: 'express',
    price: 636300,
    days: 2,
  },
]

async function mockApi(page: Page) {
  let orderPayload: unknown = null

  await page.route('**/api/v1/delivery/points', (route) =>
    route.fulfill(json({ success: true, points }))
  )
  await page.route('**/api/v1/delivery/package/types', (route) =>
    route.fulfill(json({ success: true, packages }))
  )
  await page.route('**/api/v1/delivery/calc', (route) =>
    route.fulfill(json({ success: true, options }))
  )
  await page.route('**/api/v1/delivery/order', (route) => {
    orderPayload = route.request().postDataJSON()
    return route.fulfill(
      json({
        success: true,
        reason: '',
        order: {
          _id: 'order-123',
          price: 318150,
          status: 'in_processing',
          cancellable: true,
        },
      })
    )
  })

  return () => orderPayload
}

type Person = { lastname: string; firstname: string; middlename: string }

const checkStep = async (page: Page, title: string) => {
  await expect(
    page.getByRole('heading', { name: title, exact: true })
  ).toBeVisible()
}

async function fillPersonStep(nextTitle: string, page: Page, person: Person) {
  await checkStep(page, nextTitle)
  await page.locator('input[name="lastname"]').fill(person.lastname)
  await page.locator('input[name="firstname"]').fill(person.firstname)
  await page.locator('input[name="middlename"]').fill(person.middlename)
  await page.locator('input[name="phone"]').fill('+7 999 123 45 67')
  await page.getByRole('button', { name: 'Продолжить' }).click()
}

type Address = { street: string; house: string; apartment: string }

async function fillAddressStep(
  nextTitle: string,
  page: Page,
  address: Address
) {
  await checkStep(page, nextTitle)
  await page.locator('input[name="street"]').fill(address.street)
  await page.locator('input[name="house"]').fill(address.house)
  await page.locator('input[name="apartment"]').fill(address.apartment)
  await page.getByRole('button', { name: 'Продолжить' }).click()
}

test('user calc delivery and create order', async ({ page }) => {
  const getOrderPayload = await mockApi(page)

  await page.goto('/')

  await page.getByRole('combobox').nth(0).click()
  await page.getByRole('option', { name: 'Москва' }).click()

  await page.getByRole('combobox').nth(1).click()
  await page.getByRole('option', { name: 'Санкт-Петербург' }).click()

  await page.getByRole('button', { name: 'Выберите размер' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('radio', { name: 'Конверт' }).click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()

  await page.getByRole('button', { name: 'Рассчитать' }).click()

  await checkStep(page, 'Способ отправки')
  await page.getByRole('button', { name: 'Стандартная доставка' }).click()

  await fillPersonStep('Получатель', page, {
    lastname: 'Петров',
    firstname: 'Петр',
    middlename: 'Петрович',
  })

  await fillPersonStep('Отправитель', page, {
    lastname: 'Сидоров',
    firstname: 'Сергей',
    middlename: 'Сергеевич',
  })

  await fillAddressStep('Откуда забрать', page, {
    street: 'Шелковичная',
    house: '12',
    apartment: '5',
  })

  await page.getByRole('checkbox').check()
  await fillAddressStep('Куда доставить', page, {
    street: 'Невский проспект',
    house: '10',
    apartment: '7',
  })

  await checkStep(page, 'Оплата доставки')
  await page.getByRole('radio', { name: 'Отправитель', exact: true }).check()
  await page.getByRole('button', { name: 'Продолжить' }).click()

  await checkStep(page, 'Проверка данных')
  await expect(page.getByText('Петров')).toBeVisible()
  await expect(page.getByText('Шелковичная')).toBeVisible()
  await expect(page.getByText('Невский проспект')).toBeVisible()
  await expect(page.getByText('Итого')).toBeVisible()

  await page.getByRole('button', { name: 'Продолжить' }).click()

  await checkStep(page, 'Заявка отправлена!')
  await expect(page.getByText('order-123')).toBeVisible()

  expect(getOrderPayload()).toMatchObject({
    packageId: 'envelope',
    optionType: 'default',
    senderPointId: '1',
    receiverPointId: '2',
    payer: 'sender',
    sender: { lastname: 'Сидоров', firstname: 'Сергей' },
    receiver: { lastname: 'Петров', firstname: 'Петр' },
    senderAddress: { street: 'Шелковичная', house: '12', apartment: '5' },
    receiverAddress: { street: 'Невский проспект', isNonContact: true },
  })
})
