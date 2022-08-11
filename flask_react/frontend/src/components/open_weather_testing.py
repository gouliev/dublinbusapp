## https://opensource.com/article/21/9/unit-test-python

def find_weather_for(city: str) -> dict:
    """Queries the weather API and returns the weather data for a particular city."""
    url = API.format(city_name=city, api_key=API_KEY)
    resp = requests.get(url)
    return resp.json()
    

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
API = BASE_URL + "?q={city_name}&appid={api_key}&units=metric"

@dataclass
class WeatherInfo:
    temp: float
    sunset: str
    sunrise: str
    temp_min: float
    temp_max: float
    desc: str

    @classmethod
    def from_dict(cls, data: dict) -> "WeatherInfo":
        return cls(
            temp=data["main"]["temp"],
            temp_min=data["main"]["temp_min"],
            temp_max=data["main"]["temp_max"],
            desc=data["weather"][0]["main"],
            sunset=format_date(data["sys"]["sunset"]),
            sunrise=format_date(data["sys"]["sunrise"]),
        )

def retrieve_weather(city: str) -> WeatherInfo:
    """Finds the weather for a city and returns a WeatherInfo instance."""
    data = find_weather_for(city)
    return WeatherInfo.from_dict(data)

@pytest.fixture()
def fake_weather_info():
    """Fixture that returns a static weather data."""
    with open("tests/resources/weather.json") as f:
        return json.load(f)


def test_retrieve_weather_using_mocks(mocker, fake_weather_info):
    """Given a city name, test that a HTML report about the weather is generated
    correctly."""
    # Creates a fake requests response object
    fake_resp = mocker.Mock()
    # Mock the json method to return the static weather data
    fake_resp.json = mocker.Mock(return_value=fake_weather_info)
    # Mock the status code
    fake_resp.status_code = HTTPStatus.OK

    mocker.patch("weather_app.requests.get", return_value=fake_resp)

    weather_info = retrieve_weather(city="London")
    assert weather_info == WeatherInfo.from_dict(fake_weather_info)