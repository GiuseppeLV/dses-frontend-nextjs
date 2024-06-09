
unsigned long previousMillis = 0;   
const long interval = 1000;   
const int trigPin = 9;
const int echoPin = 10;

long duration;
int distance;
void setup() {
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  Serial.begin(9600); 
}
void loop() {
  unsigned long currentMillis = millis(); 
  
    if(Serial.available()>0){

    char request = Serial.read();
    
  
    if (request == 'S') { //S is for Sampling

      digitalWrite(trigPin, LOW);
      delayMicroseconds(500);
      digitalWrite(trigPin, HIGH);
      delayMicroseconds(1000);
      digitalWrite(trigPin, LOW);
      duration = pulseIn(echoPin, HIGH);
      distance = duration * 0.034 / 2;
     Serial.println(distance);
  }
}
}