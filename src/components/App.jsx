import { Component } from 'react';
import { FeedbackOptions } from './feedback/Feedback';
import { Notification } from './notification/Notification';
import { Section } from './section/Section';
import { Statistic } from './statistic/Statistic';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = e => {
    const option = e.target.name;
    if (option) {
      this.setState(prevState => ({
        [option]: prevState[option] + 1,
      }));
    }
  };
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    if (total > 0) {
      return Math.round((this.state.good / total) * 100);
    }
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
    return (
      <div>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleClick}
          />
        </Section>

        {total > 0 ? (
          <Section title={'Statistic'}>
            <Statistic
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          </Section>
        ) : (
          <Notification message={'No feedback given'} />
        )}
      </div>
    );
  }
}
